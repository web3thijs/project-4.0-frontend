import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  organization: Organization = {id: 0, customerId: 0, name: "", companyRegistrationNr: "", vatNr: "", about: "", supportPhoneNr: "", supportEmail: ""};
  organization$: Subscription = new Subscription();
  product: Product = {id: 0, categoryId: 0, organizationId: 0, name: "", price: 0, description: "", isActive: false, imageUrl: "", organization:this.organization};
  product$: Subscription = new Subscription();


  constructor(private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.productService.getProductById(id).subscribe(result => (this.product = result));
    this.getOrganizationById();
  }

  getOrganizationById() {
    this.organization$ = this.organizationService.getOrganizationById(this.product.organizationId).subscribe(result => this.organization = result);
  }

}
