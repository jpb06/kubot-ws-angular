import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMatchComponent } from './autocomplete-match.component';

describe('AutocompleteMatchComponent', () => {
  let component: AutocompleteMatchComponent;
  let fixture: ComponentFixture<AutocompleteMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
