import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/Category';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();
  categories$: Observable<Category[]> = new Observable<Category[]>();
  organizations$: Observable<Organization[]> = new Observable<Organization[]>();

  constructor(private productService: ProductService, private categoryService: CategoryService, private organizationService: OrganizationService, private router: Router) { }

  ngOnInit(): void {

    this.products$ = this.productService.getProducts();
    this.categories$ = this.categoryService.getCategories();
    this.organizations$ = this.organizationService.getOrganizations();
  }

  onClick(productId: string) {
    this.router.navigate(['/products', productId])
  }

}
