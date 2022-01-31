import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://project-4-0-backend.herokuapp.com/api/"

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "products?page=1");
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + "products/" + id);
  }


  //https://project-4-0-backend.herokuapp.com/api/products/organization/61efca4eed676a4390618ad1

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
