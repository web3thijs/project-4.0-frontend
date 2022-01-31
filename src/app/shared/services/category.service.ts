import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "http://localhost:3000/"

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + "categories");
  }

  getCategoryById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + "categories/" + id);
  }
}
