import { Component, OnInit } from '@angular/core';

import { KubotService } from '../../services/api/kubot.service';
import { AuthenticationService } from '../../services/api/authentication.service';
import { AlertType, AlertService } from '../../services/alert.service';
import { GuildConfiguration } from '../../types/api/guild';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-guild-home',
  templateUrl: './guild-home.component.html',
  styleUrls: ['./guild-home.component.scss', './../../assets/styles/colors.scss']
})
export class GuildHomeComponent implements OnInit {

  public guildForm = this.formBuilder.group({
    adminChannel: [null, Validators.required],
    mainChannel: [null, Validators.required],
    emergencyChannel: [null, Validators.required],

    commandsPrefix: [null, Validators.required],
    activityNoticeMinPlayers: [null, Validators.compose([Validators.required, Validators.pattern('^[1-9]\d*$')])],

    scanRegionName: [null, Validators.required],
    acknowledgedMessage: [null, Validators.required],
    footerText: [null, Validators.required],
    
    selectedActivityNoticeMessages: [null],
    activityNoticeMessage: [null],
    imageUrl: [null, Validators.required],
  });

  public allActivityNoticeMessages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private kubotService: KubotService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    try {
      let guildconfig: GuildConfiguration = await this.kubotService.getGuild(this.authenticationService.getGuildId());
      this.guildForm.setValue({
        'adminChannel': guildconfig.adminChannelName,
        'mainChannel': guildconfig.mainChannelName,
        'emergencyChannel': guildconfig.emergencyChannelName,

        'commandsPrefix': guildconfig.commandsPrefix,
        'activityNoticeMinPlayers': guildconfig.activityNoticeMinPlayers,

        'scanRegionName': guildconfig.scanMainRegionName,
        'acknowledgedMessage': guildconfig.acknowledged,
        'footerText': guildconfig.messagesFooterName,
        
        'selectedActivityNoticeMessages': [],
        'activityNoticeMessage': null,
        'imageUrl': guildconfig.messagesImage,
      });

      this.allActivityNoticeMessages = guildconfig.activityNoticeMessages;
    } catch (error) {
      console.log(error);
      this.alertService.report('An error occured while retrieving guild data.', AlertType.Exception);
    }
  }

  AddNoticeMessage() {
    const message = this.guildForm.get('activityNoticeMessage');

    if (message.value.length === 0 || this.allActivityNoticeMessages.includes(message.value)) {
      return;
    }

    this.allActivityNoticeMessages.push(message.value);
    message.reset();
  }

  removeSelectedNoticeMessages() {
    const selectedMessages = this.guildForm.get('selectedActivityNoticeMessages').value;
    console.log(selectedMessages);
    if (selectedMessages !== null) {
      const filteredMessages: string[] = this.allActivityNoticeMessages.filter((el) => {
        return selectedMessages.indexOf(el) === -1;
      });
      console.log(filteredMessages);
      this.allActivityNoticeMessages = filteredMessages;
      this.guildForm.get('selectedActivityNoticeMessages').reset();
    }
  }

  removeAllNoticeMessages() {
    this.allActivityNoticeMessages = [];
    this.guildForm.controls['selectedActivityNoticeMessages'].reset([]);
  }

  async saveConfig() {
    this.alertService.clear();
    try {
      if (
        this.guildForm.valid
      ) {
        let guild: GuildConfiguration = {
          guildId: this.authenticationService.getGuildId(),

          adminChannelName: <string>this.guildForm.get('adminChannel').value,
          mainChannelName: <string>this.guildForm.get('mainChannel').value,
          emergencyChannelName: <string>this.guildForm.get('emergencyChannel').value,

          commandsPrefix: <string>this.guildForm.get('commandsPrefix').value,
          activityNoticeMinPlayers: <number>this.guildForm.get('activityNoticeMinPlayers').value,

          scanMainRegionName: <string>this.guildForm.get('scanRegionName').value,
          acknowledged: <string>this.guildForm.get('acknowledgedMessage').value,
          messagesFooterName: <string>this.guildForm.get('footerText').value,

          activityNoticeMessages: this.allActivityNoticeMessages,
          messagesImage: <string>this.guildForm.get('imageUrl').value,
        };

        let result = await this.kubotService.saveGuildSettings(guild);
        if (result) {

          setTimeout(() => { // triggers the animation
            this.alertService.report('Guild configuration successfully saved', AlertType.Success);
          });
        }
      } else {
        setTimeout(() => { // triggers the animation
          this.alertService.report('Some data is missing. Did you forget to fill an input field..?', AlertType.Neutral);
        });
      }
    } catch (error) {
      this.alertService.report('An error occured while saving guild configuration.', AlertType.Exception);
    }
  }
}
