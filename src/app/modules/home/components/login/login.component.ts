import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/security/auth.service';
import { User } from 'src/app/modules/security/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {id: '', email: '', password: '', token: ''};

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.isSubmitted = true;
      this.authService.authenticate(this.user).subscribe(result => {
        this.errorMessage = '';
        // save access token localstorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('id', result.id.toString());
        localStorage.setItem('email', result.email);
        this.router.navigate(['']);
      }, error => {
        this.errorMessage = 'Email of wachtwoord is niet juist.';
        this.isSubmitted = false;
      });
    }
}
