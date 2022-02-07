import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/security/auth.service';
import { UpdateOrderDetailDTO } from 'src/app/core/models/UpdateOrderDetailDTO'

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  baseUrl: String = "https://project-4-0-backend.herokuapp.com/api/";

  getOrdersByCustomerId(id: number): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.get<any>(this.baseUrl + "orders/customer/" + id, {headers: headers});
  }
}
