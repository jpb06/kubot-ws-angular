import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedRegionsSummaryComponent } from './watched-regions-summary.component';

describe('WatchedRegionsSummaryComponent', () => {
  let component: WatchedRegionsSummaryComponent;
  let fixture: ComponentFixture<WatchedRegionsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedRegionsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedRegionsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
