import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {UserResponse} from './user-response';
import { Customer } from 'src/app/core/models/Customer';
import { Organization } from 'src/app/core/models/Organization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 baseUrl: String = "https://project-4-0-backend.herokuapp.com/api/";
 allowOrder: boolean = false;

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
    return this.httpClient.post<UserResponse>(this.baseUrl + 'authenticate', user);
  }

  registerCustomer(customer: Omit<Customer, 'id'|'role'>): Observable<Customer> {
    return this.httpClient.post<Customer>(this.baseUrl + 'register/customer', customer);
  }

  registerOrganization(organization: Omit<Organization, 'id'|'role'>): Observable<Organization> {
    return this.httpClient.post<Organization>(this.baseUrl + 'register/customer', organization);
  }

  getAllowOrder(): boolean {
    return this.allowOrder;
  }

  setAllowOrder(allow: boolean){
    this.allowOrder = allow
  }
}
