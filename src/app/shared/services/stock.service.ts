import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Stock } from 'src/app/core/models/Stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://project-4-0-backend.herokuapp.com/api/";

  getStocks(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "stocks");
  }

  getStocksByProductId(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "stocks/product/" + id);
  }
}
