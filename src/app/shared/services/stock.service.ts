import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Stock } from 'src/app/core/models/Stock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  token: string = localStorage.getItem('token') ?? ''
  baseUrl: String = environment.database.toString();

  getStocks(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "stocks");
  }

  getStocksByProductId(id: number): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(this.baseUrl + "stocks/product/" + id);
  }

  getStocksById(id: number): Observable<Stock> {
    return this.httpClient.get<Stock>(this.baseUrl + "stocks/" + id);
  }

  getStocksByIdPut(id: number): Observable<Stock> {
    return this.httpClient.get<Stock>(this.baseUrl + "stocks/product/" + id);
  }

  postStock(stock: Omit<Stock, "id">): Observable<Stock> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.post<Stock>(this.baseUrl + "stocks", stock, {headers: headers});
  }

  putStock(stock: Stock): Observable<Stock> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.put<Stock>(this.baseUrl + "stocks", stock, {headers: headers});
  }

  deleteStock(id: number): Observable<Stock> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.delete<Stock>(this.baseUrl + "stocks/" + id, {headers: headers});
  }
}
