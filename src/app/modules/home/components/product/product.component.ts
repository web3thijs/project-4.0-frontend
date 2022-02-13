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
import { HttpClient } from '@angular/common/http';

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
  searchTerm: string = "";
  searchKey: string = "";

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

  constructor(private productService: ProductService, private categoryService: CategoryService, private organizationService: OrganizationService, private router: Router, private stockService: StockService, private interactionService: InteractionService, private authService: AuthService, private httpClient: HttpClient) { }

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
      map(response => response)
    )
  }

  getOrganizations() {
    this.organizations$ = this.organizationService.getOrganizations().pipe(
      map(response => response.content)
    )
  }

  onClick(productId: number) {
    this.interaction.customerId = parseInt(this.authService.getUser()!.id);
    this.interaction.productId = productId;
    this.postAddClick$ = this.interactionService.postAddClicks(this.interaction).subscribe(result => {
      this.router.navigate(['/producten', productId]);
    },
    error => {
      this.errorMessage = error.message;
    });

  }



  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm)
    this.products$ = this.httpClient.get<any>("https://project-4-0-backend.herokuapp.com/api/products?naam=" + this.searchTerm).pipe(
      map(response => response.content)
    );
  }

  nav() {
    this.router.navigate(['/producten'])
  }

  onOrganizationChanged(event: any) {
    console.log(event.target.value);
    if(event.target.value > 0) {
      this.products$ = this.httpClient.get<any>("https://project-4-0-backend.herokuapp.com/api/products?vzw=" + event.target.value).pipe(
      map(response => response.content)
    );
    } else {
      this.getProducts();
    }
  }

  onCategorieChanged(event: any) {
    console.log(event.target.value);
    if(event.target.value > 0) {
      this.products$ = this.httpClient.get<any>("https://project-4-0-backend.herokuapp.com/api/products?categorie=" + event.target.value).pipe(
        map(response => response.content)
      );
    } else {
      this.getProducts();
    }
  }

  onPriceChanged(event: any) {
    console.log(event.target.value);
    if(event.target.value > 0) {
      if(event.target.value == 1) {
        this.products$ = this.httpClient.get<any>("https://project-4-0-backend.herokuapp.com/api/products?sort=price&order=desc").pipe(
          map(response => response.content)
        );
      } else {
        this.products$ = this.httpClient.get<any>("https://project-4-0-backend.herokuapp.com/api/products?sort=price&order=asc").pipe(
          map(response => response.content)
        );
      }
    } else {
      this.getProducts();
    }
  }

}
