import { Component, OnInit, ViewChild } from '@angular/core';
import { WatchedRegionsSummaryComponent } from '../watched-regions-summary/watched-regions-summary.component';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { WatchedRegion } from 'src/types/api/watched.region';
import { KubotService } from 'src/services/api/kubot.service';
import { StaticDataService } from 'src/services/api/static.service';
import { AlertService, AlertType } from 'src/services/alert.service';
import { AuthenticationService } from 'src/services/api/authentication.service';
import { WatchItem } from 'src/types/models/watch.item.model';

import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-guild-regions',
  templateUrl: './guild.regions.component.html',
  styleUrls: [
    './../../assets/styles/colors.scss',
    './../../assets/styles/form.validation.scss',
    './../../assets/styles/watched.items.common.scss'
  ]
})
export class GuildRegionsComponent implements OnInit {
  @ViewChild(WatchedRegionsSummaryComponent) regionsSummaryChild: WatchedRegionsSummaryComponent;

  private addFormTitle: string = 'Add a region to the watch list';
  private modFormTitle: string = 'Modify the region';
  private formButtonAddText: string = 'Add';
  private formButtonModifyText: string = 'Modify';

  private starSystems: Array<string> = [];
  private alreadyAddedStarSystems: Array<string> = [];

  starSystemsMatches: Array<string> = [];

  public regionForm = this.formBuilder.group({
    regionName: [null, Validators.required],
    watchedSystems: [null, Validators.required],
    systemSearch: [null],
    alwaysDisplay: [null],
    showEveryone: [null]
  });
  public watchedRegions: Array<WatchedRegion> = [];
  public initialConfiguration: string;
  public regionFormTitle: string = this.addFormTitle;
  public formButtonText: string = this.formButtonAddText;
  public configurationChanged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private kubotService: KubotService,
    private staticDataService: StaticDataService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    try {
      this.regionForm.setValue({
        regionName: '',
        watchedSystems: [],
        systemSearch: '',
        alwaysDisplay: false,
        showEveryone: false
      });

      let allStarSystems = await this.staticDataService.getStarSystems();
      this.starSystems = allStarSystems.map(el => el.name).filter((el, index, self) => self.indexOf(el) === index);

      this.watchedRegions = await this.kubotService.getRegions(this.authenticationService.getGuildId());
      this.initialConfiguration = JSON.stringify(this.watchedRegions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));

      this.initializeAlreadyAddedSystems();

      this.regionForm.get('systemSearch').valueChanges
        .pipe(debounceTime(500))
        .subscribe(term => {
          if (term.length === 0) {
            this.starSystemsMatches = [];
          }
          else {
            this.starSystemsMatches = this.starSystems.filter(el =>
              el.toLowerCase().includes(term.toLowerCase()) && !this.alreadyAddedStarSystems.includes(el));
          }
        });

    } catch (error) {
      console.log(error);
      this.alertService.report('An error occured while retrieving watched regions for your guild.', AlertType.Exception);
    }
  }

  initializeAlreadyAddedSystems() {
    this.alreadyAddedStarSystems = [];

    for (let i = 0; i < this.watchedRegions.length; i++) {
      let region = this.watchedRegions[i];

      this.alreadyAddedStarSystems.push(...region.systems);
    }
  }

  watchItemDeleted(watchedSystem: WatchItem) {
    let watchedSystems: Array<WatchItem> = this.regionForm.get('watchedSystems').value;
    watchedSystems = watchedSystems.filter(el => el.value !== watchedSystem.value);
    this.regionForm.get('watchedSystems').reset(watchedSystems);

    if (this.regionForm.get('systemSearch').value.length > 0 &&
        watchedSystem.value.toLowerCase().includes(this.regionForm.get('systemSearch').value.toLowerCase())) {
      this.starSystemsMatches.push(watchedSystem.value);
    }
    this.alreadyAddedStarSystems = this.alreadyAddedStarSystems.filter(el => el !== watchedSystem.value);
  }

  systemSearchResultSelected(system: string) {
    let watchedSystems: Array<WatchItem> = this.regionForm.get('watchedSystems').value;
    watchedSystems.push({ type: 'system', value: system });
    this.regionForm.get('watchedSystems').reset(watchedSystems);

    this.starSystemsMatches = this.starSystemsMatches.filter(el => el !== system);
    this.alreadyAddedStarSystems.push(system);
  }

  watchedRegionModified(region: WatchedRegion) {
    this.alertService.clear();
    this.regionFormTitle = this.modFormTitle;
    this.formButtonText = this.formButtonModifyText;

    this.regionForm.get('regionName').reset(region.name);
    this.regionForm.get('systemSearch').reset('');
    this.regionForm.get('watchedSystems').reset(region.systems.map(el => {
      return {
        type: 'System',
        value: el
      }
    }));

    this.regionForm.get('alwaysDisplay').reset(region.alwaysDisplay);
    this.regionForm.get('showEveryone').reset(region.showPlayers);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  watchedRegionRemoved(region: WatchedRegion) {
    this.watchedRegions = this.watchedRegions.filter(el => el.name !== region.name);
    this.configurationChanged = this.verifyIfConfigurationChanged();

    this.initializeAlreadyAddedSystems();
  }

  setRegion() {
    this.alertService.clear();
    if (this.regionsSummaryChild === undefined || this.regionsSummaryChild.selectedIndex === -1) { // case add
      if (this.watchedRegions.find(el => el.name === this.regionForm.value.regionName)) {
        this.alertService.report(`The name '${this.regionForm.value.regionName}' is already being used. Names must be unique.`, AlertType.Neutral);
      } else {
        this.watchedRegions.push({
          guildId: this.authenticationService.getGuildId(),
          name: this.regionForm.value.regionName,
          alwaysDisplay: this.regionForm.value.alwaysDisplay,
          showPlayers: this.regionForm.value.showEveryone,
          systems: this.regionForm.value.watchedSystems.map(el => el.value)
        });
      }
    } else { // case mod
      let index = this.regionsSummaryChild.selectedIndex;
      this.watchedRegions[index].name = this.regionForm.value.regionName;
      this.watchedRegions[index].alwaysDisplay = this.regionForm.value.alwaysDisplay;
      this.watchedRegions[index].showPlayers = this.regionForm.value.showEveryone;
      this.watchedRegions[index].systems = this.regionForm.value.watchedSystems.map(el => el.value);
    }

    this.resetForm();
  }

  cancelModify() {
    this.resetForm();
  }

  private resetForm() {
    if (this.regionsSummaryChild !== undefined) {
      this.regionsSummaryChild.selectedIndex = -1;
    }
    this.regionForm.get('regionName').reset();
    this.regionForm.get('systemSearch').reset('');
    this.regionForm.get('watchedSystems').reset([]);
    this.regionForm.get('alwaysDisplay').reset(false);
    this.regionForm.get('showEveryone').reset(false);
    this.regionFormTitle = this.addFormTitle;
    this.formButtonText = this.formButtonAddText;
    this.configurationChanged = this.verifyIfConfigurationChanged();
  }

  private verifyIfConfigurationChanged(): boolean {

    let asJson = JSON.stringify(this.watchedRegions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));

    if (asJson === this.initialConfiguration) {
      return false;
    } else {
      return true;
    }
  }

  async saveChanges(): Promise<void> {
    try {
      this.alertService.clear();
      let result = await this.kubotService.saveRegions(this.authenticationService.getGuildId(), this.watchedRegions);
      if (result) {
        this.alertService.report('Configuration saved.', AlertType.Success);
        this.configurationChanged = false;
        this.initialConfiguration = JSON.stringify(this.watchedRegions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      } else {
        this.alertService.report('Persistence failure.', AlertType.Exception);
      }
    } catch (error) {
      console.log(error);
      this.alertService.report('An error occured while saving your watched regions configuration.', AlertType.Exception);
    }
  }

  async resetConfig(): Promise<void> {
    this.alertService.clear();
    this.watchedRegions = await this.kubotService.getRegions(this.authenticationService.getGuildId());
    this.configurationChanged = false;

    this.initializeAlreadyAddedSystems();
  }
}
