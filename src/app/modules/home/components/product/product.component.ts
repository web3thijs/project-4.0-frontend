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

  constructor(private productService: ProductService, private categoryService: CategoryService, private organizationService: OrganizationService, private router: Router, private stockService: StockService) { }

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

  onClick(productId: string) {
    this.router.navigate(['/producten', productId])
  }

}
