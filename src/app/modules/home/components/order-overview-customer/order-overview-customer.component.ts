import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-overview-customer',
  templateUrl: './order-overview-customer.component.html',
  styleUrls: ['./order-overview-customer.component.scss']
})
export class OrderOverviewCustomerComponent implements OnInit {
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
