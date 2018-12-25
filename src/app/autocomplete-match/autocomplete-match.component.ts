import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete-match',
  templateUrl: './autocomplete-match.component.html',
  styleUrls: ['./autocomplete-match.component.scss']
})
export class AutocompleteMatchComponent implements OnInit {

  @Input() value: string;
  @Output() selected = new EventEmitter<string>();

  constructor() { }
  ngOnInit() { }

  select(): void {
    this.selected.emit(this.value);
  }
}
