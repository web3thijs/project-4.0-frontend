import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProductFormComponent } from './organization-product-form.component';

describe('OrganizationProductFormComponent', () => {
  let component: OrganizationProductFormComponent;
  let fixture: ComponentFixture<OrganizationProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationProductFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
