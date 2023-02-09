import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CManagementComponent } from './c-management.component';

describe('CManagementComponent', () => {
  let component: CManagementComponent;
  let fixture: ComponentFixture<CManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
