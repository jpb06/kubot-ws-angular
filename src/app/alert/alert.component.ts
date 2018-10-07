import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  state,
  style,
  useAnimation
} from '@angular/animations';
import { shake, slideOutUp } from 'ng-animate';

import { AlertService, AlertType } from './../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
  animations: [
    trigger('alert', [
      state('open', style({
        display: 'block'
      })),
      state('closed', style({
        display: 'none'
      })),

      transition('closed => open', useAnimation(shake)),
      transition('open => closed', useAnimation(slideOutUp))
    ]),
  ],
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public alertType = AlertType;
  type: AlertType;
  message: string;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(alert => {
      if (alert) {
        this.message = alert.message;
        this.type = alert.type;
      } else {
        this.message = undefined;
        this.type = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
