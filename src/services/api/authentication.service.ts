import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateService } from './../date.service';
import { BaseApiService } from './base/base.api.service';

@Injectable()
export class AuthenticationService extends BaseApiService {
  constructor(
    private http: HttpClient,
    private dateService: DateService
  ) {
    super();
  }

  async login(
    guildId: string,
    password: string
  ): Promise<any> {

    

    let req = await this.http.post<any>(`${this.host}/ws/login`, {
      login: guildId,
      password: password,
      expiresIn: 20 * 60
    }).toPromise();

    if (req && req.status === 200 && req.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('guild_id', guildId);
      localStorage.setItem('id_token', req.token);
      localStorage.setItem('roles', JSON.stringify(req.roles));
      localStorage.setItem('expiration_date', JSON.parse(req.expirationDate));
    }

    return true;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('guild_id');
    localStorage.removeItem('id_token');
    localStorage.removeItem('roles');
    localStorage.removeItem('expiration_date');
  }

  isLoggedIn() {
    let rawExpirationDate = localStorage.getItem('expiration_date');
    if (localStorage.getItem('id_token') && localStorage.getItem('guild_id') && rawExpirationDate) {
      return this.dateService.isExpired(rawExpirationDate);
    }

    return false;
  }

  getGuildId() {
    return localStorage.getItem('guild_id');
  }

  hasRole(role: string) {
    let roles: Array<string> = JSON.parse(localStorage.getItem('roles'));

    return (roles.indexOf(role) !== -1);
  }
}
