import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/core/models/Organization';
import { User } from 'src/app/core/models/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { Product } from 'src/app/core/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {
  user: User = {id: "", email: "", password: "", phoneNr: "", address: "", postalCode: "", country: "", role: ""};
  user$: Subscription = new Subscription();
  organization: Organization = {id: "", organizationName: "", companyRegistrationNr: "", vatNr: "", about: "", supportPhoneNr:"", supportEmail: "", imageUrl: "", user:this.user};
  organization$: Subscription = new Subscription();
  products$: Observable<Product[]> = new Observable<Product[]>();

  shopIsShown = true;
  aboutIsShown = false;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.organizationService.getOrganizationById(id).subscribe(result => (this.organization = result));
    this.products$ = this.productService.getProducts();
    console.log(this.products$);
  }

  products() {
    this.aboutIsShown = false;
    this.shopIsShown = true;
  }

  about() {
    this.aboutIsShown = true;
    this.shopIsShown = false;
  }

  onClick(productId: string) {
    this.router.navigate(['/products', productId])
  }

}
