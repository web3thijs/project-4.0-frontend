import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCategoryFormComponent } from './dashboard-category-form.component';

describe('DashboardCategoryFormComponent', () => {
  let component: DashboardCategoryFormComponent;
  let fixture: ComponentFixture<DashboardCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
