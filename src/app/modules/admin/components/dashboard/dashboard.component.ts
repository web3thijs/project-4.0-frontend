import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/security/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLogout: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toAdminOrganization() {
    this.router.navigate(['dashboard-admin/organisaties']);
  }

  toAdminCustomer() {
    this.router.navigate(['dashboard-admin/klanten']);
  }

  toAdminProduct() {
    this.router.navigate(['dashboard-admin/producten']);
  }

  toAdminCategory() {
    this.router.navigate(['dashboard-admin/categorieën']);
  }

  logOut() {
    this.isLogout = true;
    this.authService.deleteToken();
    this.router.navigate(['']);
  }

}
