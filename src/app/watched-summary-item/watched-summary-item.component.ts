import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-watched-summary-item',
  templateUrl: './watched-summary-item.component.html',
  styleUrls: ['./watched-summary-item.component.scss']
})
export class WatchedSummaryItemComponent implements OnInit {

  @Input() value: string;

  constructor() { }
  ngOnInit() { }

}
