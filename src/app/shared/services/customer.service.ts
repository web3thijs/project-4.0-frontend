import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/models/Customer';
import { AuthService } from 'src/app/modules/security/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  token: string = localStorage.getItem('token') ?? ''
  baseUrl: String = environment.database.toString();

  getCustomerById(id: number): Observable<Customer> {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.get<Customer>(this.baseUrl + "customers/" + id, {headers: headers});
  }

  getCustomers(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.get<any>(this.baseUrl + "customers", {headers: headers});
  }
}
