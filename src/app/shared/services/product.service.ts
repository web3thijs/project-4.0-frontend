import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/core/models/Product';
import { SimilarProduct } from 'src/app/core/models/SimilarProduct';
import { ProductListPaginationDTO } from 'src/app/core/models/ProductListPaginationDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  token: string = localStorage.getItem('token') ?? ''
  baseUrl: String = environment.database.toString();

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "products");
  }

  getProductsDTO(): Observable<ProductListPaginationDTO> {
    return this.httpClient.get<ProductListPaginationDTO>(this.baseUrl + "products");
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + "products/" + id);
  }

  getProductsByOrganizationId(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "products/organization/" + id);
  }

  postProduct(product: Omit<Product, "id">): Observable<Product> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.post<Product>(this.baseUrl + "products", product, {headers: headers});
  }

  putProduct(product: Product): Observable<Product> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.put<Product>(this.baseUrl + "products", product, {headers: headers});
  }

  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(this.baseUrl + "products/" + id);
  }

  getSimilarProducts(id: number): Observable<SimilarProduct[]> {
    return this.httpClient.get<SimilarProduct[]>("https://project-4-0-ai.herokuapp.com/" + "product?productId=" + id);
  }

  getRecomendedProducts(id: number): Observable<SimilarProduct[]> {
    return this.httpClient.get<SimilarProduct[]>("https://project-4-0-ai.herokuapp.com/" + "userrecommendation?customerId=" + id);
  }
}
