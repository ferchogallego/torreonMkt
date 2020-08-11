import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminavComponent } from './adminav.component';

describe('AdminavComponent', () => {
  let component: AdminavComponent;
  let fixture: ComponentFixture<AdminavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
