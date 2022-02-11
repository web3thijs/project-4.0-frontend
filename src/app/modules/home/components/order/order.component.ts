import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartDonationDTO } from 'src/app/core/models/CartDonationDTO';
import { CartDTO } from 'src/app/core/models/CartDTO';
import { CartProductDTO } from 'src/app/core/models/CartProductDTO';
import { CompleteOrderDTO } from 'src/app/core/models/CompleteOrderDTO';
import { Customer } from 'src/app/core/models/Customer';
import { Organization } from 'src/app/core/models/Organization';
import { AuthService } from 'src/app/modules/security/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  cart: Observable<CartDTO>;
  products: Observable<CartProductDTO[]>;
  donations: Observable<CartDonationDTO[]>;
  organizations: Observable<Organization[]>;
  customer$: Subscription = new Subscription;

  completeOrderDTO: CompleteOrderDTO = {
    country: '',
    postal: '',
    address: ''
  }

  orderForm = new FormGroup({
    country: new FormControl(''),
    postal: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private router: Router, private cartService: CartService, private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCart();
    this.getCustomer();
  }

  ngOnDestroy(): void {

  }

  getCart() {
    this.cart = this.cartService.getCart().pipe(
      map(result => result)
    );

    this.products = this.cart.pipe(
      map(result => result.cartProductDTOS)
    )

    this.donations = this.cart.pipe(
      map(result => result.cartDonationDTOS)
    )
  }

  getCustomer(){
    this.customer$ = this.customerService.getCustomerById(parseInt(this.authService.getUser()!.id)).subscribe(result => {
      this.orderForm.setValue({
        country: result.country,
        postal: result.postalCode,
        address: result.address
      })
    })
  }

  async completeOrder(){
    await this.cartService.completeOrder(this.completeOrderDTO).toPromise();
    this.authService.setAllowOrder(true);
    this.router.navigate(["/besteld"]);
  }
}
