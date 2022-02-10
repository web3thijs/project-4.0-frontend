import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartDonationDTO } from 'src/app/core/models/CartDonationDTO';
import { CartProductDTO } from 'src/app/core/models/CartProductDTO';
import { OrderConfirmationDTO } from 'src/app/core/models/OrderConfirmationDTO';
import { Organization } from 'src/app/core/models/Organization';
import { AuthService } from 'src/app/modules/security/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  confirmation$: Subscription = new Subscription;
  products: Observable<CartProductDTO[]>;
  donations: Observable<CartDonationDTO[]>;
  organizations: Observable<Organization[]>;
  orderConfirmationDTO: OrderConfirmationDTO = {
    cartProductDTOS: [],
    cartDonationDTOS: [],
    country: '',
    postal: '',
    address: ''
  }

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {
    if(this.authService.allowOrder){
      this.getConfirmation();
      this.authService.setAllowOrder(false);
    } else {
      // router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }

  async getConfirmation() {
    this.confirmation$ = await this.cartService.getOrderConfirmation().subscribe(result => {
      this.orderConfirmationDTO.cartProductDTOS = result.cartProductDTOS;
      this.orderConfirmationDTO.cartDonationDTOS = result.cartDonationDTOS;
      this.orderConfirmationDTO.address = result.address;
      this.orderConfirmationDTO.country = result.country;
      this.orderConfirmationDTO.postal = result.postal;
    })
  }
}
