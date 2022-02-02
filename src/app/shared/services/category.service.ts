import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://project-4-0-backend.herokuapp.com/api/"

  getCategories(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "categories");
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + "categories/" + id);
  }
}
