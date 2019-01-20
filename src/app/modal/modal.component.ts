import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() watchedElement: any;
  @Output() modificationRequested = new EventEmitter<any>();
  @Output() removalRequested = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  modify(): void {
    this.modificationRequested.emit(this.watchedElement);

  }

  remove(): void {
    this.removalRequested.emit(this.watchedElement);
  }
}
