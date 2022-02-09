import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/Category';
import { OrderDetail } from 'src/app/core/models/OrderDetail';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';
import { OrderdetailService } from 'src/app/shared/services/orderdetail.service';

@Component({
  selector: 'app-organization-order',
  templateUrl: './organization-order.component.html',
  styleUrls: ['./organization-order.component.scss']
})
export class OrganizationOrderComponent implements OnInit {
  orderdetail$: Observable<OrderDetail[]>;

  category: Category = {
    id: 0,
    name: ''
  }

  organization: Organization = {
    organizationName: '',
    companyRegistrationNr: '',
    vatNr: '',
    who: '',
    what: '',
    help: '',
    supportPhoneNr: '',
    supportEmail: '',
    imageUrl: '',
    id: 0,
    email: '',
    password: '',
    phoneNr: '',
    address: '',
    postalCode: '',
    country: '',
    role: ''
  }

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: [],
    active: false,
    category: this.category,
    organization: this.organization
  }


  constructor(private orderdetailService: OrderdetailService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  //BRENT zijn manier
  getOrderDetails() {
    this.orderdetail$ = this.orderdetailService.getOrderdetails().pipe(
      map(response => response)
    );
  }

}
