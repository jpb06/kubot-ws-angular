import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { LoadingBarService } from 'src/services/loading.bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[class.loading-bar-fixed]': 'fixed',
  }
})
export class LoadingBarComponent implements OnInit {

  @Input() includeSpinner = true;
  @Input() includeBar = true;
  @Input() fixed = true;
  @Input() color;
  @Input() height;
  @Input() diameter;
  @Input() value = null;

  constructor(public loader: LoadingBarService) { }

  ngOnInit() {
  }

}
