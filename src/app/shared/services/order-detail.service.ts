import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/app/core/models/OrderDetail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: String = environment.database.toString();
  token: string = localStorage.getItem('token') ?? ''

  postOrderDetail(orderDetail: Omit<OrderDetail, "id">): Observable<OrderDetail> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.post<OrderDetail>(this.baseUrl + "orderdetails", orderDetail, {headers: headers});
  }
}
