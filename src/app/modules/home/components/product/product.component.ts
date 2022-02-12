import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/Category';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { Stock } from 'src/app/core/models/Stock';
import { StockService } from 'src/app/shared/services/stock.service';
import { Interaction } from 'src/app/core/models/Interaction';
import { Customer } from 'src/app/core/models/Customer';
import { InteractionService } from 'src/app/shared/services/interaction.service';
import { AuthService } from 'src/app/modules/security/auth.service';
import { Review } from 'src/app/core/models/Review';
import { AddToInteractionDTO } from 'src/app/core/models/AddToInteractionDTO';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //BRENT zijn manier
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  organizations$: Observable<Organization[]>;
  errorMessage: string = '';

  postAddClick$: Subscription = new Subscription();


  /*id: number;
  amountClicks: number;
  amountCart: number;
  amountBought: number;
  review: Review;
  product: Product;
  customer: Customer;*/

  customer: Omit<Customer, "firstName" | "lastName" | "email" | "password" | "phoneNr" | "postalCode" | "address" | "country" | "role"> = {
    id: 0
  }

  postCustomer: Customer = {
    firstName: '',
    lastName: '',
    id: 0,
    email: '',
    password: '',
    phoneNr: '',
    address: '',
    postalCode: '',
    country: '',
    role: ''
  }

  product: Omit<Product, "name" | "price" | "description" | "imageUrl" | "active" | "category" | "organization"> = {
    id: 0
  }

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

  postProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: [],
    active: false,
    category: this.category,
    organization: this.organization
  }

  review: Omit<Review, "id" | "score" | "title" | "text" | "customer"> = {
  }

  interaction: Omit<Interaction, "id" | "amountCart" | "amountBought" | "amountClicks" | "review" | "product" | "customer"> = {
    productId: 0,
    customerId: 0,
  }

  addToInteractionDTO: AddToInteractionDTO = {
    customerId: 0,
    productId: 0
  }

  constructor(private productService: ProductService, private categoryService: CategoryService, private organizationService: OrganizationService, private router: Router, private stockService: StockService, private interactionService: InteractionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getOrganizations();
  }

  //BRENT zijn manier
  getProducts() {
    this.products$ = this.productService.getProducts().pipe(
      map(response => response.content)
    );
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories().pipe(
      map(response => response.content)
    )
  }

  getOrganizations() {
    this.organizations$ = this.organizationService.getOrganizations().pipe(
      map(response => response.content)
    )
  }

  async onClick(productId: number) {
    if(this.authService.getRole() ==  "CUSTOMER"){
      this.addToInteractionDTO.customerId = parseInt(this.authService.getUser()!.id);
      this.addToInteractionDTO.productId = productId

      await this.interactionService.addClick(this.addToInteractionDTO).toPromise();
    }

    this.router.navigate(['/producten', productId]);
  }
}
