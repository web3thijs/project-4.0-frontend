import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDTO } from 'src/app/core/models/CartDTO';
import { UpdateOrderDetailDTO } from 'src/app/core/models/UpdateOrderDetailDTO';
import { AuthService } from 'src/app/modules/security/auth.service';

type NewType = Observable<any>;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  baseUrl: String = "https://project-4-0-backend.herokuapp.com/api/";

  getCart(){
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.get<CartDTO>(this.baseUrl + "cart", {headers: headers});
  }

  addProductToOrder(updateOrderDTO: UpdateOrderDetailDTO): NewType {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<UpdateOrderDetailDTO>(this.baseUrl + "cart/addProduct", updateOrderDTO, {headers: headers});
  }
}
