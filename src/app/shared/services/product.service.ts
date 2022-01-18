import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
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

  getProductsById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + "products?productId=" + productId);
  }
}
