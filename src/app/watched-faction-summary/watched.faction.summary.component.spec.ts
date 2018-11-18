import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedFactionSummaryComponent } from './watched.faction.summary.component';

describe('WatchedFactionSummaryComponent', () => {
  let component: WatchedFactionSummaryComponent;
  let fixture: ComponentFixture<WatchedFactionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WatchedFactionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedFactionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
