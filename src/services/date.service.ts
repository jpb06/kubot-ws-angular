import { Injectable } from "@angular/core";

import * as moment from 'moment';

@Injectable()
export class DateService {

  constructor() { }

  isExpired(date: string): boolean {
    let now = moment();
    let expirationDate = moment(date);

    if (now.isBefore(expirationDate)) {
      return true;
    } else {
      return false;
    }
  }
}
