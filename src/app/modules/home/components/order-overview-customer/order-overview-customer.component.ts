import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-overview-customer',
  templateUrl: './order-overview-customer.component.html',
  styleUrls: ['./order-overview-customer.component.scss']
})
export class OrderOverviewCustomerComponent implements OnInit {
  errorMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  add() {
    this.router.navigate(['retour']);
  }

}
