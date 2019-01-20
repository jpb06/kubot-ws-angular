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
  selectedElement: any = undefined;

  constructor() { }
  ngOnInit() { }

  select(
    region: WatchedRegion,
    index: number
  ): void {
    this.selectedElement = {
      element: region,
      index: index
    };
  }

  watchedFactionModificationRequested(data: any) {
    this.selectedIndex = data.index;
    this.modified.emit(data.element as WatchedRegion);
  }

  watchedFactionRemovalRequested(data: any) {
    this.selectedIndex = -1;
    this.removed.emit(data.element as WatchedRegion);
  }
}
