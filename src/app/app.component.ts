import { Component, OnInit } from '@angular/core';

import * as $ from "jquery"
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['home']);
  }
}
