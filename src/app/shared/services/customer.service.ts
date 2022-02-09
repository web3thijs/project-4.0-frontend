import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  token: string = localStorage.getItem('token') ?? ''
  baseUrl = "https://project-4-0-backend.herokuapp.com/api/"

  getCustomers(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.get<any>(this.baseUrl + "customers", {headers: headers});
  }
}
