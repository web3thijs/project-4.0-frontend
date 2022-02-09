import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/Customer';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.scss']
})
export class DashboardCustomerComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private customerSerivce: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customers$ = this.customerSerivce.getCustomers().pipe(
      map(response => response.content)
    );
  }

}
