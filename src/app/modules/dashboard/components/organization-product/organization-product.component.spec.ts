import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProductComponent } from './organization-product.component';

describe('OrganizationProductComponent', () => {
  let component: OrganizationProductComponent;
  let fixture: ComponentFixture<OrganizationProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
