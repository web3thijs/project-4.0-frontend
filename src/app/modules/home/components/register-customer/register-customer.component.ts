import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/models/Customer';
import { AuthService } from 'src/app/modules/security/auth.service';
import { User } from 'src/app/modules/security/user';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {
  customer: Omit<Customer, 'id'|'role'> = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNr: '',
    address: '',
    postalCode: '',
    country: ''
  }

  user: User = {
    id: '',
    email: '',
    password: '',
    token: ''
  }

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    this.user.email = this.customer.email
    this.user.password = this.customer.password

      this.authService.registerCustomer(this.customer).subscribe(result => {
        this.errorMessage = '';

        this.authService.authenticate(this.user).subscribe(result => {
          this.errorMessage = '';
          // save access token localstorage
          localStorage.setItem('token', result.token);
          localStorage.setItem('id', result.id.toString());
          localStorage.setItem('email', result.email);

          this.router.navigate(['']);
        }, error => {
          this.errorMessage = 'Authenticate failed.';
          this.isSubmitted = false;
        });
      }, error => {
        this.errorMessage = 'Register failed.';
        this.isSubmitted = false;
        return;
      });
    }
}
