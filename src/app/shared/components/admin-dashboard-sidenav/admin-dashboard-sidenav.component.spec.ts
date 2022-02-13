import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardSidenavComponent } from './admin-dashboard-sidenav.component';

describe('AdminDashboardSidenavComponent', () => {
  let component: AdminDashboardSidenavComponent;
  let fixture: ComponentFixture<AdminDashboardSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
