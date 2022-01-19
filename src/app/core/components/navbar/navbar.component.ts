import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");
  itemsInCart = 0;

  constructor() { }

  ngOnInit(): void {
    if(this.shoppingCart != null){
      this.itemsInCart = JSON.parse(localStorage.productsInCart).length;
    } else {
      console.log("Cart is empty");
    }
  }

}
