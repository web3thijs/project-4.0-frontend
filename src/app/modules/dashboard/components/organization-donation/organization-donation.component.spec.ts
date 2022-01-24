import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDonationComponent } from './organization-donation.component';

describe('OrganizationDonationComponent', () => {
  let component: OrganizationDonationComponent;
  let fixture: ComponentFixture<OrganizationDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
