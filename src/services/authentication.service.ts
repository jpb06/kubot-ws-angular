import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateService } from './date.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private dateService: DateService
  ) { }

  async login(guildId: string, password: string) {

    let req = await this.http.post<any>(
      `http://localhost:1337/api/ws/login`,
      {
        login: guildId,
        password: password,
        expiresIn: 5 * 60
      }
    ).toPromise();

    if (req && req.status === 'Success' && req.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('id_token', req.token);
      localStorage.setItem('expiration_date', JSON.parse(req.expirationDate));
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
      return this.dateService.isExpired(rawExpirationDate);
    }

    return false;
  }
}
