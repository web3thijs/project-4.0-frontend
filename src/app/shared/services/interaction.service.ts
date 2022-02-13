import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToInteractionDTO } from 'src/app/core/models/AddToInteractionDTO';
import { Customer } from 'src/app/core/models/Customer';
import { Interaction } from 'src/app/core/models/Interaction';
import { Product } from 'src/app/core/models/Product';
import { AuthService } from 'src/app/modules/security/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  token: string = localStorage.getItem('token') ?? ''
  baseUrl: String = environment.database.toString();;

  getInteractions(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<any>(this.baseUrl + "interactions", {headers: headers});
  }

  addClick(addToInteractionDTO: AddToInteractionDTO) {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<AddToInteractionDTO>(this.baseUrl + "interactions/addClick", addToInteractionDTO, {headers: headers});
  }

  addCart(addToInteractionDTO: AddToInteractionDTO) {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<AddToInteractionDTO>(this.baseUrl + "interactions/addCart", addToInteractionDTO, {headers: headers});
  }

  addBuy(addToInteractionDTO: AddToInteractionDTO) {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.authService.getToken() );
    return this.httpClient.post<AddToInteractionDTO>(this.baseUrl + "interactions/addBuy", addToInteractionDTO, {headers: headers});
  }
}
