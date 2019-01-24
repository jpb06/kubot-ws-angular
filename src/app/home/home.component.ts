import { Component, OnInit } from '@angular/core';

import { StaticDataService } from 'src/services/api/static.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  guildsCount: number;

  constructor(
    private staticDataService: StaticDataService
  ) { }

  async ngOnInit() {
    this.guildsCount = await this.staticDataService.getGuildsCount();
  }
}
