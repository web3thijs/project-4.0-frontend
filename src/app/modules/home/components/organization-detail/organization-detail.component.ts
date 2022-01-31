import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
  organization: Organization = {id: "", email: "", phoneNr: "", address: "", postalCode: "", country: "", role: "", organizationName: "", companyRegistrationNr: "", vatNr: "", who: "", what: "", help: "", supportPhoneNr:"", supportEmail: "", imageUrl: ""};
  organization$: Subscription = new Subscription();
  products$: Observable<Product[]>;

  shopIsShown = true;
  aboutIsShown = false;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.organizationService.getOrganizationById(id).subscribe(result => (this.organization = result));
    this.products$ = this.organizationService.getProductsByOrganization(id).pipe(
      map(response => response.content)
    );
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
    this.router.navigate(['/producten', productId])
  }
}
