import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {UserResponse} from './user-response';
import { Customer } from 'src/app/core/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 baseUrl: String = "http://localhost:8081/";

  constructor(private httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUser(): User | null {
    if (this.isLoggedIn()){
      return { id : (localStorage.getItem('id') ?? '0') ,
        email: localStorage.getItem('email') ?? '', password: '',
        token: this.getToken()  };
    } else {
      return null;
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  authenticate(user: User): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(this.baseUrl + 'api/authenticate', user);
  }

  registerCustomer(customer: Omit<Customer, 'id'|'role'>): Observable<Customer> {
    return this.httpClient.post<Customer>(this.baseUrl + 'api/register/customer', customer);
  }
}
