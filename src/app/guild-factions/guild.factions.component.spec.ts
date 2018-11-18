import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildFactionsComponent } from './guild.factions.component';

describe('GuildFactionsComponent', () => {
  let component: GuildFactionsComponent;
  let fixture: ComponentFixture<GuildFactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildFactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildFactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
