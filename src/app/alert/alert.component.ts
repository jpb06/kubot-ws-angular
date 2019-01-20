import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  state,
  style,
  useAnimation,
  animate
} from '@angular/animations';
import { shake, slideOutUp, bounceOutUp } from 'ng-animate';

import { AlertService, AlertType } from './../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))]),
    trigger('hide', [transition('* => *', useAnimation(bounceOutUp))]),
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

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.animate('shake');
      } else {
        this.message = undefined;
        this.type = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  animate(name: string) {
    this[name] = !this[name];
  }
}
