import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRetourComponent } from './order-retour.component';

describe('OrderRetourComponent', () => {
  let component: OrderRetourComponent;
  let fixture: ComponentFixture<OrderRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
