import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DateService } from '../services/date.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private dateService: DateService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let rawExpirationDate = localStorage.getItem('expiration_date');
    if (localStorage.getItem('id_token') && rawExpirationDate) {
      // Now to check if the session has expired.
      return this.dateService.isExpired(rawExpirationDate);
    }

    // not logged in so redirect to login page
    this.router.navigate(['/home']);
    return false;
  }
}
