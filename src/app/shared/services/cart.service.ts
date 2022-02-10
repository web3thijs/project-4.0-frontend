import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDTO } from 'src/app/core/models/CartDTO';
import { CompleteOrderDTO } from 'src/app/core/models/CompleteOrderDTO';
import { OrderConfirmationDTO } from 'src/app/core/models/OrderConfirmationDTO';
import { UpdateDonationDTO } from 'src/app/core/models/UpdateDonationDTO';
import { UpdateOrderDetailDTO } from 'src/app/core/models/UpdateOrderDetailDTO';
import { AuthService } from 'src/app/modules/security/auth.service';
import { environment } from 'src/environments/environment';

type NewType = Observable<any>;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  baseUrl: String = environment.database.toString();

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


  updateProductFromOrder(updateOrderDetailDTO: UpdateOrderDetailDTO): NewType {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<UpdateOrderDetailDTO>(this.baseUrl + "cart/updateProduct", updateOrderDetailDTO, {headers: headers});
  }

  addDonationToOrder(updateDonationDTO: UpdateDonationDTO): NewType {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<UpdateOrderDetailDTO>(this.baseUrl + "cart/addDonation", updateDonationDTO, {headers: headers});
  }


  updateDonationFromOrder(updateDonationDTO: UpdateDonationDTO): NewType {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<UpdateDonationDTO>(this.baseUrl + "cart/updateDonation", updateDonationDTO, {headers: headers});
  }

  completeOrder(completeOrderDTO: CompleteOrderDTO): NewType {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<CompleteOrderDTO>(this.baseUrl + "cart/completeOrder", completeOrderDTO, {headers: headers});
  }

  getOrderConfirmation(){
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.get<OrderConfirmationDTO>(this.baseUrl + "cart/completed", {headers: headers});
  }
}
