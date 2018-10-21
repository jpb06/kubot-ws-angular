import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuildConfiguration } from './../../types/api/guild';
import { BaseApiService } from './base/base.api.service';

@Injectable()
export class KubotService extends BaseApiService {
  
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  async getGuild(id: string): Promise<GuildConfiguration> {
    let result = await this.http.post<any>(`${this.host}/api/kubot/guild`, {
      id: id
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return result.data as GuildConfiguration;
  }

  async saveGuildSettings(guild: GuildConfiguration): Promise<boolean> {
    let result = await this.http.post<any>(`${this.host}/api/kubot/saveguild`, {
      guild: guild
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return true;
  }

}
