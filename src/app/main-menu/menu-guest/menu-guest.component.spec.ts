import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGuestComponent } from './menu-guest.component';

describe('MenuGuestComponent', () => {
  let component: MenuGuestComponent;
  let fixture: ComponentFixture<MenuGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
