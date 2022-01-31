import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://project-4-0-backend.herokuapp.com/api/"
  public search = new BehaviorSubject<string>("");

  getOrganizations(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "organizations");
  }

  getProductsByOrganization(id: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "products/organization/" + id);
  }

  getOrganizationById(id: string): Observable<Organization> {
    return this.httpClient.get<Organization>(this.baseUrl + "organizations/" + id);
  }
}
