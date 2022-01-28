import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';
import { User } from 'src/app/core/models/User';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-organization-product',
  templateUrl: './organization-product.component.html',
  styleUrls: ['./organization-product.component.scss']
})
export class OrganizationProductComponent implements OnInit {
  user: User = {id: "", email: "", password: "", phoneNr: "", address: "", postalCode: "", country: "", role: ""};
  organization: Organization = {
    organizationName: '',
    companyRegistrationNr: '',
    vatNr: '',
    about: '',
    supportPhoneNr: '',
    supportEmail: '',
    imageUrl: '',
    id: '',
    email: '',
    password: '',
    phoneNr: '',
    address: '',
    postalCode: '',
    country: '',
    role: ''
  };
  product: Product = {id: "", categoryId: "", organizationId: "", name: "", price: 0, description: "", isActive: false, imageUrl: "", organization:this.organization};




  user$: Subscription = new Subscription();
  organization$: Subscription = new Subscription();
  products$: Subscription = new Subscription();
  products: Product[] = [];
  deleteProduct$: Subscription = new Subscription();

  errorMessage: string = '';


  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
    this.deleteProduct$.unsubscribe();
  }

  add() {
    this.router.navigate(['/dashboard/organisatie/product/form'], {state: {mode: 'add'}});
  }

  edit(id: string) {
    this.router.navigate(['/dashboard/organisatie/product/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: string) {
    this.deleteProduct$ = this.productService.deleteProduct(id).subscribe(result => {
      //all went well
      this.getProducts();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getProducts() {
    this.products$ = this.productService.getProducts().subscribe(result => this.products = result);
  }

}
