import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPagenotfoundComponent } from './organization-pagenotfound.component';

describe('OrganizationPagenotfoundComponent', () => {
  let component: OrganizationPagenotfoundComponent;
  let fixture: ComponentFixture<OrganizationPagenotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationPagenotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPagenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
