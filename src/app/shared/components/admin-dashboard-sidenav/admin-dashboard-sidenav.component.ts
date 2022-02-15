import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/security/auth.service';

@Component({
  selector: 'app-admin-dashboard-sidenav',
  templateUrl: './admin-dashboard-sidenav.component.html',
  styleUrls: ['./admin-dashboard-sidenav.component.scss']
})
export class AdminDashboardSidenavComponent implements OnInit {
  isLogout: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.isLogout = true;
    this.authService.deleteToken();
    this.router.navigate(['']);
  }
}
