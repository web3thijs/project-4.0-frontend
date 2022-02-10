import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/models/Customer';
import { Interaction } from 'src/app/core/models/Interaction';
import { Product } from 'src/app/core/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private httpClient: HttpClient) { }

  token: string = localStorage.getItem('token') ?? ''
  baseUrl: String = environment.database.toString();;

  getInteractions(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.get<any>(this.baseUrl + "interactions", {headers: headers});
  }

  postAddClicks(interaction: Omit<Interaction, "id" | "amountCart" | "amountBought" | "amountClicks" | "review" | "product" | "customer">): Observable<Interaction> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.post<Interaction>(this.baseUrl + "interactions/addClick", interaction, {headers: headers});
  }

  putInteractionAmountClicks(interaction: Interaction): Observable<Interaction> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.put<Interaction>(this.baseUrl + "interactions", interaction, {headers: headers});
  }
}
