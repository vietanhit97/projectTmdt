import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UManagementComponent } from './u-management.component';

describe('UManagementComponent', () => {
  let component: UManagementComponent;
  let fixture: ComponentFixture<UManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
