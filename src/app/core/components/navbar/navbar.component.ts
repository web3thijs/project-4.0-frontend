import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/security/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from '../../models/Customer';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");
  itemsInCart = 0;
  isCustomer: boolean = false;
  isOrganization: boolean = false;
  isAdmin: boolean = false;
  helper = new JwtHelperService();
  isLogout: boolean = false;

  constructor(public authService: AuthService, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    if(this.shoppingCart != null){
      this.itemsInCart = JSON.parse(localStorage.productsInCart).length;
    } else {
      console.log("Cart is empty");
    }

    const decodedToken = this.helper.decodeToken(this.authService.getToken());
    console.log(decodedToken);

    if (decodedToken.role == "CUSTOMER") {
      this.isCustomer = true;
    } else if (decodedToken.role == "ORGANIZATION") {
      this.isOrganization = true;
    } else {
      this.isAdmin = true;
    }


  }

  logOut() {
    this.isLogout = true;
    this.authService.deleteToken();
    this.router.navigate(['']);
  }



}
