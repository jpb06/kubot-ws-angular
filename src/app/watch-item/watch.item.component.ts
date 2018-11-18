import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WatchItem } from '../../types/models/watch.item.model';

@Component({
  selector: 'app-watch-item',
  templateUrl: './watch.item.component.html',
  styleUrls: ['./watch.item.component.scss']
})
export class WatchItemComponent implements OnInit {

  @Input() watchItem: WatchItem;
  @Output() deleted = new EventEmitter<WatchItem>();

  constructor() { }
  ngOnInit() { }

  remove(): void {
    this.deleted.emit(this.watchItem);
  }
}
