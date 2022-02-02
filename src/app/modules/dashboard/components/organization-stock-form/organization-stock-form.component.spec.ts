import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationStockFormComponent } from './organization-stock-form.component';

describe('OrganizationStockFormComponent', () => {
  let component: OrganizationStockFormComponent;
  let fixture: ComponentFixture<OrganizationStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationStockFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
