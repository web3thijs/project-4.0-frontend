import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPagenotfoundComponent } from './dashboard-pagenotfound.component';

describe('DashboardPagenotfoundComponent', () => {
  let component: DashboardPagenotfoundComponent;
  let fixture: ComponentFixture<DashboardPagenotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPagenotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPagenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
