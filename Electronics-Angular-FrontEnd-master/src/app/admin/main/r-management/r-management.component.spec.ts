import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RManagementComponent } from './r-management.component';

describe('RManagementComponent', () => {
  let component: RManagementComponent;
  let fixture: ComponentFixture<RManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
