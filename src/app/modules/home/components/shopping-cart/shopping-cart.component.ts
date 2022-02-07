import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartDonationDTO } from 'src/app/core/models/CartDonationDTO';
import { CartDTO } from 'src/app/core/models/CartDTO';
import { CartProductDTO } from 'src/app/core/models/CartProductDTO';
import { Order } from 'src/app/core/models/Order';
import { Organization } from 'src/app/core/models/Organization';
import { Stock } from 'src/app/core/models/Stock';
import { UpdateDonationDTO } from 'src/app/core/models/UpdateDonationDTO';
import { AuthService } from 'src/app/modules/security/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { StockService } from 'src/app/shared/services/stock.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  orders: Observable<Order[]>;
  orders$: Subscription = new Subscription;
  updateDonation$: Subscription = new Subscription();
  currentOrder: Order

  cart: Observable<CartDTO>;
  cart$: Subscription = new Subscription;
  products: Observable<CartProductDTO[]>;
  donations: Observable<CartDonationDTO[]>;
  organizations$: Observable<Organization[]>;

  updateDonationDTO: UpdateDonationDTO = {
    organizationId: 0,
    amount: 0
  }

  @ViewChild('closeModal') closeModal: ElementRef;

  @ViewChild("modal") modal: ElementRef;

  constructor(private organizationService: OrganizationService, private router: Router, private stockService: StockService, private orderService: OrderService, private authService: AuthService, private cartService: CartService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getCart()
    this.getOrganizations();
  }


  ngOnDestroy(): void {
    this.cart$.unsubscribe();
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

  getOrganizations() {
    this.organizations$ = this.organizationService.getOrganizations().pipe(
      map(response => response.content)
    );
  }

  async submitDonation(){
    await this.cartService.addDonationToOrder(this.updateDonationDTO).toPromise();
    this.closeModal.nativeElement.click();
    this.updateDonationDTO.amount = 0
    this.updateDonationDTO.organizationId = 0

    this.getCart()
  }
}
