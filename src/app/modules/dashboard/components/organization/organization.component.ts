import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toOrganizationProduct() {
    this.router.navigate(['/dashboard/organisatie/product']);
  }

  toOrganizationOrder() {
    this.router.navigate(['/dashboard/organisatie/bestelling']);
  }

  toOrganizationDonation() {
    this.router.navigate(['/dashboard/organisatie/vrije-gift']);
  }

}
