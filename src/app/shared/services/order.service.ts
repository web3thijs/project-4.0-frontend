import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistoryDTO } from 'src/app/core/models/OrderHistoryDTO';
import { UpdateOrderDetailDTO } from 'src/app/core/models/UpdateOrderDetailDTO'
import { AuthService } from 'src/app/modules/security/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  baseUrl: String = environment.database.toString();

  getOrdersByCustomerId(id: number): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.get<any>(this.baseUrl + "orders/customer/" + id, {headers: headers});
  }

  getOrderHistory(){
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.get<OrderHistoryDTO[]>(this.baseUrl + "orders", {headers: headers});
  }
}
