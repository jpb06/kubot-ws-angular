import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WatchedRegion } from 'src/types/api/watched.region';

@Component({
  selector: 'app-watched-regions-summary',
  templateUrl: './watched-regions-summary.component.html',
  styleUrls: ['./../../assets/styles/watched.items.summary.common.scss']
})
export class WatchedRegionsSummaryComponent implements OnInit {

  @Input() watchedRegions: Array<WatchedRegion>;
  @Output() modified = new EventEmitter<WatchedRegion>();
  @Output() removed = new EventEmitter<WatchedRegion>();
  selectedIndex: number = -1;

  constructor() { }
  ngOnInit() { }

  modify(
    region: WatchedRegion,
    index: number
  ): void {
    this.selectedIndex = index;
    this.modified.emit(region);
  }

  remove(
    region: WatchedRegion,
    index: number
  ): void {
    this.selectedIndex = -1;
    this.removed.emit(region);
  }
}
