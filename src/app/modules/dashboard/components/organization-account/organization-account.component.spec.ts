import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAccountComponent } from './organization-account.component';

describe('OrganizationAccountComponent', () => {
  let component: OrganizationAccountComponent;
  let fixture: ComponentFixture<OrganizationAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
