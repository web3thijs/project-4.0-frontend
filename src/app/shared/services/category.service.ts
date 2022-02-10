import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: String = environment.database.toString();
  token: string = localStorage.getItem('token') ?? ''

  getCategories(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "categories");
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + "categories/" + id);
  }

  getCategoriesNew(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "categories");
  }

  postCategory(category: Omit<Category, "id">): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.post<Category>(this.baseUrl + "categories", category, {headers: headers});
  }

  putCategory(category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );
    return this.httpClient.put<Category>(this.baseUrl + "categories", category, {headers: headers});
  }

  deleteCategory(id: number): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.delete<Category>(this.baseUrl + "categories/" + id, {headers: headers});
  }
}
