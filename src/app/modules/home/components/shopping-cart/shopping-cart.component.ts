import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");
  itemsInCart = 0;
  productsIdsInCart: string[] = [];

  totalPrice = 0;
  shippingCost = 5;
  noShippingCost = 0;
  totalOrderPrice = 0;
  donation = 0;
  totalDonation = 0;
  chosenOrganization = '';
  organizationDonationChosen = '';

  newValueProduct = 0;

  donationIsAdded = false;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.donationChange();
    this.getTotalPriceShoppingCart();

    if(localStorage.getItem("productsInCart") === '[]') {
      localStorage.setItem('shippingCost', JSON.stringify(this.noShippingCost));
    }

    this.totalDonation = parseInt(localStorage.getItem('totalDonationAdded') || '');

    if(this.totalDonation > 0) {
      this.donationIsAdded = true;
    }

    if("productsInCart" in localStorage && "totalOrderPrice" in localStorage && "shippingCost" in localStorage) {
      if(this.shoppingCart != null){
        this.itemsInCart = JSON.parse(localStorage.productsInCart).length;
        console.log("Items in cart " + this.itemsInCart);
      } else if(localStorage.getItem("productsInCart") === null) {
        localStorage.setItem('shippingCost', JSON.stringify(this.noShippingCost));
      } else {
        console.log("Cart is empty");
      }
    }

    for(let i = 0; i < this.itemsInCart; i++) {
      this.productsIdsInCart.push(this.shoppingCart[i].id);
    }
  }

  donationChange() {
    this.totalDonation = 0;
    this.donation = parseInt((<HTMLInputElement>document.getElementById("donation")).value);

    console.log("Value donation" + this.donation);
  }

  donationAdd() {
    this.totalDonation = this.donation;
    localStorage.setItem('totalDonationAdded', JSON.stringify(this.totalDonation));
    location.reload();
  }

  organizationAdd() {
    this.chosenOrganization = (<HTMLInputElement>document.getElementById("donationOrganizations")).value;
    localStorage.setItem('chosenOrganizationDonation', this.chosenOrganization);
  }

  amountChange(id: number) {
    console.log("ID " + id);
    this.newValueProduct = parseInt((<HTMLInputElement>document.getElementById(id.toString())).value);

    var cart_items = JSON.parse(localStorage["productsInCart"]);
    var productsAdd = JSON.parse(localStorage.getItem("productsInCart") || "[]");
    for(let i = 0; i < cart_items.length; i++) {
      if(cart_items[i].id == id) {
        if(this.productsIdsInCart.includes(id.toString())) {
          console.log("ID zit al in object");
          var productAdd = {
            id: cart_items[i].id,
            categoryId: cart_items[i].categoryId,
            organizationId: cart_items[i].organizationId,
            name: cart_items[i].name,
            price: cart_items[i].price,
            description: cart_items[i].description,
            isActive: cart_items[i].isActive,
            imageUrl: cart_items[i].imageUrl,
            valueProduct: this.newValueProduct
        };
        productsAdd.push(productAdd);
        localStorage.setItem("productsInCart", JSON.stringify(productsAdd));
        }

    }
  }
  }

  getTotalPriceShoppingCart() {
    for(let i = 0, len = JSON.parse(localStorage.productsInCart).length; i < len; ++i ) {
      this.totalPrice += this.shoppingCart[i].price * this.shoppingCart[i].valueProduct;
    }

    localStorage.setItem('totalProductsAdded', JSON.stringify(this.totalPrice));


    this.totalDonation = parseInt(localStorage.getItem('totalDonationAdded') || '');
    this.totalPrice = parseFloat(localStorage.getItem('totalProductsAdded') || '');

    if(this.totalPrice >= 30) {
      this.totalOrderPrice = this.totalPrice + this.totalDonation;
      console.log("totalPrice: " + this.totalPrice);
      localStorage.setItem('totalOrderPrice', JSON.stringify(this.totalOrderPrice));
      localStorage.setItem('shippingCost', JSON.stringify(this.noShippingCost));
    } else if(this.totalPrice < 30 && this.totalPrice > 1) {
      this.totalOrderPrice = this.totalPrice + this.totalDonation + this.shippingCost;
      localStorage.setItem('totalOrderPrice', JSON.stringify(this.totalOrderPrice));
      localStorage.setItem('shippingCost', JSON.stringify(this.shippingCost));
    } else if(this.totalPrice == 0 && this.totalDonation > 0) {
      this.totalOrderPrice = this.totalPrice + this.totalDonation;
      localStorage.setItem('totalOrderPrice', JSON.stringify(this.totalOrderPrice));
      localStorage.setItem('shippingCost', JSON.stringify(this.noShippingCost));
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

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

  deleteDonation() {
    this.totalDonation = 0;
    localStorage.setItem('totalDonationAdded', JSON.stringify(0));
    location.reload();
  }

}
