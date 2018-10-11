import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService, AlertType } from '../../services/alert.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent implements OnInit {
  public guildId: string = '';
  public password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() { }

  async login() {
    this.alertService.clear();

    if (this.guildId.length === 0 || this.password.length === 0) {
      setTimeout(() => { // triggers the animation
        this.alertService.report('You must enter a login and a password.');
      }, 0);
    } else {
      try {
        let authResult = await this.authenticationService.login(this.guildId, this.password)
        this.router.navigate(['guild']);

      } catch (error) {
        if (error.status === 401) {
          this.alertService.report('Authentication failed.', AlertType.AuthFailure);
        } else if (error.status === 404) {
          this.alertService.report('Network error : could not reach API.', AlertType.Exception);
        } else {
          this.alertService.report('An error occured.', AlertType.Exception);
        }
      }
    }
  }
}
