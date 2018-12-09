import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DateService } from './../../services/date.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private dateService: DateService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let rawExpirationDate = localStorage.getItem('expiration_date');
    let roles: Array<string> = JSON.parse(localStorage.getItem('roles'));

    if (localStorage.getItem('id_token') && rawExpirationDate && roles) {
      // Now to check if the session has expired.
      return this.dateService.isExpired(rawExpirationDate) && (roles.indexOf('admin') !== -1);
    }

    // Not authorized, so let's go to index
    this.router.navigate(['/guild']);
    return false;
  }
}
