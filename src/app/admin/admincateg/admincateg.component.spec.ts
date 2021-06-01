import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincategComponent } from './admincateg.component';

describe('AdmincategComponent', () => {
  let component: AdmincategComponent;
  let fixture: ComponentFixture<AdmincategComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincategComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
