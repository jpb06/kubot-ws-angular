import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedSummaryItemComponent } from './watched-summary-item.component';

describe('WatchedSummaryItemComponent', () => {
  let component: WatchedSummaryItemComponent;
  let fixture: ComponentFixture<WatchedSummaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedSummaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
