import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base/base.api.service';
import { StarSystem } from 'src/types/api/star.system';

@Injectable()
export class AdminService extends BaseApiService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  async setStarSystems(starSystems: Array<StarSystem>): Promise<void> {

    let result = await this.http.post<any>(`${this.host}/api/kubot/admin/setstarsystems`, {
      starsystems: starSystems
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }
  }
}
