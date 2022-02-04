import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/app/core/models/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://project-4-0-backend.herokuapp.com/api/"
  token: string = localStorage.getItem('token') ?? ''

  postOrderDetail(orderDetail: Omit<OrderDetail, "id">): Observable<OrderDetail> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.post<OrderDetail>(this.baseUrl + "orderdetails", orderDetail, {headers: headers});
  }
}
