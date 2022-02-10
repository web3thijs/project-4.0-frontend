import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverviewCustomerComponent } from './order-overview-customer.component';

describe('OrderOverviewCustomerComponent', () => {
  let component: OrderOverviewCustomerComponent;
  let fixture: ComponentFixture<OrderOverviewCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOverviewCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
