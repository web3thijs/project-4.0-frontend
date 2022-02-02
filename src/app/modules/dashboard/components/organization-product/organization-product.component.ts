import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/Category';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';
import { User } from 'src/app/core/models/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-organization-product',
  templateUrl: './organization-product.component.html',
  styleUrls: ['./organization-product.component.scss']
})
export class OrganizationProductComponent implements OnInit {
  user: User = {id: 0, email: "", password: "", phoneNr: "", address: "", postalCode: "", country: "", role: ""};
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
  };
  category: Category = { id: 0, name: ""};
  product: Product = {id: 0, name: "", price: 0, description: "", isActive: false, imageUrl: "", categoryId: 0, organizationId: 0, organization:this.organization, category: this.category};

  organization$: Subscription = new Subscription();
  //products$: Subscription = new Subscription();
  products$: Observable<Product[]>;
  deleteProduct$: Subscription = new Subscription();

  errorMessage: string = '';
  id = JSON.stringify(localStorage.getItem('id')|| '');


  constructor(private productService: ProductService, private organizationService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    //this.getProducts();
  }

  /*ngOnDestroy(): void {
    this.products$.unsubscribe();
    this.deleteProduct$.unsubscribe();
  }*/

  add() {
    this.router.navigate(['organisatie/product/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    this.router.navigate(['organisatie/product/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteProduct$ = this.productService.deleteProduct(id).subscribe(result => {
      //all went well
      //this.getProducts();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  /*getProducts() {
    this.products$ = this.organizationService.getProductsByOrganization(this.id).pipe(
      map(response => response.content)
    );

  }*/

}
