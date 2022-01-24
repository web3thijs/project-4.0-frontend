import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationOrderComponent } from './organization-order.component';

describe('OrganizationOrderComponent', () => {
  let component: OrganizationOrderComponent;
  let fixture: ComponentFixture<OrganizationOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
