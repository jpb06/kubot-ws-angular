import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildRegionsComponent } from './guild-regions.component';

describe('GuildRegionsComponent', () => {
  let component: GuildRegionsComponent;
  let fixture: ComponentFixture<GuildRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
