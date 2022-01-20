import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");

  itemsInCart = 0;

  totalPrice = 0;
  shippingCost = 5;
  totalOrderPrice = 0;
  donation = -1;
  totalDonation = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getTotalPriceShoppingCart();
    this.amountChange();
    this.onEnter();

    if(this.shoppingCart != null){
      this.itemsInCart = JSON.parse(localStorage.productsInCart).length;
    } else {
      console.log("Cart is empty");
    }
  }

  amountChange() {
    this.donation ++;
    console.log("Value " + this.donation);
  }

  onEnter() {
    this.totalDonation += this.donation;
  }

  getTotalPriceShoppingCart() {
    for(let i = 0, len = JSON.parse(localStorage.productsInCart).length; i < len; ++i ) {
      this.totalPrice += this.shoppingCart[i].price * this.shoppingCart[i].valueProduct;
    }

    if(this.totalPrice > 30 || this.totalDonation > 0 || this.totalDonation == 0) {
      this.totalOrderPrice = this.totalPrice + this.totalDonation;
      localStorage.setItem('totalOrderPrice', JSON.stringify(this.totalOrderPrice));
      localStorage.setItem('shippingCost', JSON.stringify(0));
    } else //if(this.totalOrderPrice < 30)
    {
      this.totalOrderPrice = this.totalPrice + this.totalDonation;
      localStorage.setItem('totalOrderPrice', JSON.stringify(this.totalOrderPrice));
      localStorage.setItem('shippingCost', JSON.stringify(5));
    }
  }

  //Pagina herladen zonder te refreshen (voor item uit winkelmandje)
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //Specifiek item uit winkelmandje verwijderen
  delete(id: number) {
    var cart_items = JSON.parse(localStorage["productsInCart"]);
    for(let i = 0; i < cart_items.length; i++) {
      if(cart_items[i].id == id) {
        cart_items.splice(i, 1);
        localStorage["productsInCart"] = JSON.stringify(cart_items);
        this.reloadComponent();
      }
    }
    location.reload();
  }

}
