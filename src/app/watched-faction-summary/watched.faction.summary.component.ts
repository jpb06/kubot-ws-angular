import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WatchedFaction } from '../../types/api/watched.faction';

@Component({
  selector: 'app-watched-faction-summary',
  templateUrl: './watched.faction.summary.component.html',
  styleUrls: ['./../../assets/styles/watched.items.summary.common.scss']
})
export class WatchedFactionSummaryComponent implements OnInit {

  @Input() watchedFactions: Array<WatchedFaction>;
  @Output() modified = new EventEmitter<WatchedFaction>();
  @Output() removed = new EventEmitter<WatchedFaction>();
  selectedIndex: number = -1;

  constructor() { }
  ngOnInit() { }

  modify(
    faction: WatchedFaction,
    index: number
  ): void {
    this.selectedIndex = index;
    this.modified.emit(faction);
  }

  remove(
    faction: WatchedFaction,
    index: number
  ): void {
    this.selectedIndex = -1;
    this.removed.emit(faction);
  }
}
