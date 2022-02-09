import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  organizations: Observable<Organization[]>;
  organizations$: Subscription = new Subscription();
  organizationRandom: Organization[];

  constructor(private router: Router, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.getOrganizations();
    //this.organizationService.getOrganizations().subscribe(organizations => this.organizations = organizations);
    //console.log(this.organizations);
  }

  getOrganizations() {
    this.organizations = this.organizationService.getOrganizations().pipe(
      map(response => response.content)
    );

    /*this.organizations$ = this.organizations.subscribe(result => {
      var random1 = Math.floor(Math.random() * 3 + 1);
      var random2 = Math.floor(Math.random() * 3 + 1);
      var random3 = Math.floor(Math.random() * 3 + 1);
      console.log(result[random1]);
      this.organizationRandom = new Array(result[random1]);
      this.organizationRandom.push(result[random1]);
      this.organizationRandom.push(result[random2]);
      this.organizationRandom.push(result[random3]);
      console.log("organizationRandom: " + this.organizationRandom);
      console.log("organizationRandom new " + this.organizationRandom);
    })*/


  }

  onClick(productId: number) {
    this.router.navigate(['/producten', productId])
  }

}
