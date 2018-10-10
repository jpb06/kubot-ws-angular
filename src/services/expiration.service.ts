import { Injectable } from "@angular/core";

import * as moment from 'moment';

@Injectable()
export class ExpirationService {

  constructor() { }

  validate(rawExpirationDate: string): boolean {
    let now = moment();
    let expirationDate = moment(rawExpirationDate);

    if (now.isBefore(expirationDate)) {
      return true;
    } else {
      return false;
    }
  }
}
