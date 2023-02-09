import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PManagementComponent } from './p-management.component';

describe('PManagementComponent', () => {
  let component: PManagementComponent;
  let fixture: ComponentFixture<PManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
