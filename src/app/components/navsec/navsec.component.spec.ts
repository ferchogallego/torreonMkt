import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsecComponent } from './navsec.component';

describe('NavsecComponent', () => {
  let component: NavsecComponent;
  let fixture: ComponentFixture<NavsecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavsecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavsecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
