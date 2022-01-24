import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "http://localhost:3000/"

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl + "products");
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + "products/" + id);
  }

  postProduct(product: Product): Observable<Product> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Product>(this.baseUrl + "products", product, {headers: headers});
  }

  putProduct(id: string, product: Product): Observable<Product> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Product>(this.baseUrl + "products/" + id, product, {headers: headers});
  }

  deleteProduct(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(this.baseUrl + "products/" + id);
  }
}
