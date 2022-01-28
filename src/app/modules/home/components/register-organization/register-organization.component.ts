import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/core/models/Organization';
import { AuthService } from 'src/app/modules/security/auth.service';
import { User } from 'src/app/modules/security/user';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.scss']
})
export class RegisterOrganizationComponent implements OnInit {
  organization: Omit<Organization, 'id'|'role'> = {
    organizationName: '',
    companyRegistrationNr: '',
    vatNr: '',
    about: '',
    supportPhoneNr: '',
    supportEmail: '',
    imageUrl: '',
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

  goNext(progress: FormComponent) {
    progress.next();
  }

  goPrev(progress: FormComponent) {
    progress.prev();
  }

  onStateChange(event: any) {
    console.log(event);
  }

  ngAfterViewInit() {}

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    this.user.email = this.organization.email
    this.user.password = this.organization.password

      this.authService.registerOrganization(this.organization).subscribe(result => {
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
      }, (error: any) => {
        this.errorMessage = 'Register failed.';
        this.isSubmitted = false;
        return;
      });
    }
}
