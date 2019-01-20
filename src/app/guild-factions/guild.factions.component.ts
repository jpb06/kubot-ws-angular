import { Component, OnInit, ViewChild } from '@angular/core';
import { WatchItem } from '../../types/models/watch.item.model';
import { Validators, FormBuilder } from '@angular/forms';
import { WatchedFaction } from '../../types/api/watched.faction';
import { KubotService } from '../../services/api/kubot.service';
import { AuthenticationService } from '../../services/api/authentication.service';
import { AlertService, AlertType } from '../../services/alert.service';
import { WatchedFactionSummaryComponent } from '../watched-faction-summary/watched.faction.summary.component';

@Component({
  selector: 'app-guild-factions',
  templateUrl: './guild.factions.component.html',
  styleUrls: [
    './../../assets/styles/colors.scss',
    './../../assets/styles/form.validation.scss',
    './../../assets/styles/watched.items.common.scss'
  ]
})
export class GuildFactionsComponent implements OnInit {
  @ViewChild(WatchedFactionSummaryComponent) factionsSummaryChild: WatchedFactionSummaryComponent;

  private addFormTitle: string = 'Add a faction to the watch list';
  private modFormTitle: string = 'Modify the faction';
  private formButtonAddText: string = 'Add';
  private formButtonModifyText: string = 'Modify';

  public factionForm = this.formBuilder.group({
    factionName: [null, Validators.required],
    watchedTags: [null, Validators.required],
    tag: [null],
    alwaysDisplay: [null]
  });
  public watchedFactions: Array<WatchedFaction> = [];
  public initialConfiguration: string;
  public factionFormTitle: string = this.addFormTitle;
  public formButtonText: string = this.formButtonAddText;
  public configurationChanged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private kubotService: KubotService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    try {
      this.factionForm.setValue({
        factionName: '',
        watchedTags: [],
        tag: '',
        alwaysDisplay: false
      });

      this.watchedFactions = await this.kubotService.getFactions(this.authenticationService.getGuildId());
      this.initialConfiguration = JSON.stringify(this.watchedFactions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
    } catch (error) {
      this.alertService.report('An error occured while retrieving watched factions for your guild.', AlertType.Exception);
    }
  }

  addTag() {
    let tag = this.factionForm.get('tag').value;
    let watchedTags: Array<WatchItem> = this.factionForm.get('watchedTags').value;
    if (tag !== '' && !watchedTags.find(el => el.value === tag)) {
      watchedTags.push({ type: 'Tag', value: tag });
      this.factionForm.get('tag').reset();
      this.factionForm.get('watchedTags').reset(watchedTags);
    }
  }

  watchItemDeleted(watchTag: WatchItem) {
    let watchedTags: Array<WatchItem> = this.factionForm.get('watchedTags').value;
    watchedTags = watchedTags.filter(el => el.value !== watchTag.value);
    this.factionForm.get('watchedTags').reset(watchedTags);
  }

  watchedFactionModified(faction: WatchedFaction) {
    this.alertService.clear();
    this.factionFormTitle = this.modFormTitle;
    this.formButtonText = this.formButtonModifyText;

    this.factionForm.get('factionName').reset(faction.name);
    this.factionForm.get('tag').reset();
    this.factionForm.get('watchedTags').reset(faction.tags.map(el => {
      return {
        type: 'Tag',
        value: el
      }
    }));

    this.factionForm.get('alwaysDisplay').reset(faction.alwaysDisplay);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  watchedFactionRemoved(faction: WatchedFaction) {
    this.watchedFactions = this.watchedFactions.filter(el => el.name !== faction.name);
    this.configurationChanged = this.verifyIfConfigurationChanged();
  }

  setFaction() {
    this.alertService.clear();
    if (this.factionsSummaryChild.selectedIndex === -1) { // case add
      if (this.watchedFactions.find(el => el.name === this.factionForm.value.factionName)) {
        this.alertService.report(`The name '${this.factionForm.value.factionName}' is already being used. Names must be unique.`, AlertType.Neutral);
      } else {
        this.watchedFactions.push({
          guildId: this.authenticationService.getGuildId(),
          name: this.factionForm.value.factionName,
          alwaysDisplay: this.factionForm.value.alwaysDisplay,
          tags: this.factionForm.value.watchedTags.map(el => el.value)
        });
      }
    } else { // case mod
      let index = this.factionsSummaryChild.selectedIndex;
      this.watchedFactions[index].name = this.factionForm.value.factionName;
      this.watchedFactions[index].alwaysDisplay = this.factionForm.value.alwaysDisplay;
      this.watchedFactions[index].tags = this.factionForm.value.watchedTags.map(el => el.value);
    }

    this.resetForm();
  }

  cancelModify() {
    this.resetForm();
  }

  private resetForm() {
    this.factionsSummaryChild.selectedIndex = -1;
    this.factionForm.get('factionName').reset();
    this.factionForm.get('tag').reset();
    this.factionForm.get('watchedTags').reset([]);
    this.factionForm.get('alwaysDisplay').reset(false);
    this.factionFormTitle = this.addFormTitle;
    this.formButtonText = this.formButtonAddText;
    this.configurationChanged = this.verifyIfConfigurationChanged();
  }

  private verifyIfConfigurationChanged(): boolean {

    let asJson = JSON.stringify(this.watchedFactions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));

    if (asJson === this.initialConfiguration) {
      return false;
    } else {
      return true;
    }
  }

  async saveChanges(): Promise<void> {
    try {
      this.alertService.clear();
      let result = await this.kubotService.saveFactions(this.authenticationService.getGuildId(), this.watchedFactions);
      if (result) {
        this.alertService.report('Configuration saved.', AlertType.Success);
        this.configurationChanged = false;
        this.initialConfiguration = JSON.stringify(this.watchedFactions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      } else {
        this.alertService.report('Persistence failure.', AlertType.Exception);
      }
    } catch (error) {
      console.log(error);
      this.alertService.report('An error occured while saving your watched factions configuration.', AlertType.Exception);
    }
  }

  async resetConfig(): Promise<void> {
    this.alertService.clear();
    this.watchedFactions = await this.kubotService.getFactions(this.authenticationService.getGuildId());
    this.configurationChanged = false;
  }
}
