import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpirationService } from './expiration.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private expirationService: ExpirationService
  ) { }

  async login(guildId: string, password: string) {

    let req = await this.http.post<any>(`http://localhost:1337/api/ws/login`, { login: guildId, password: password }).toPromise();

    if (req && req.status === 'Success' && req.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('id_token', req.token);
      localStorage.setItem('expiration_date', req.expirationDate);
    }

    return true;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('id_token');
    localStorage.removeItem('expiration_date');
  }

  isLoggedIn() {
    let rawExpirationDate = localStorage.getItem('expiration_date');
    if (localStorage.getItem('id_token') && rawExpirationDate) {
      return this.expirationService.validate(rawExpirationDate);
    }

    return false;
  }
}
