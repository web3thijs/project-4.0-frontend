import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toAdminOrganization() {
    this.router.navigate(['dashboard-admin/organisaties']);
  }

  toAdminCustomer() {
    this.router.navigate(['dashboard-admin/gebruikers']);
  }

  toAdminProduct() {
    this.router.navigate(['dashboard-admin/producten']);
  }

}
