import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient) { }

  token: string = localStorage.getItem('token') ?? ''
  baseUrl: String = environment.database.toString();
  public search = new BehaviorSubject<string>("");

  getOrganizations(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "organizations");
  }

  getProductsByOrganization(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "products/organization/" + id);
  }

  getOrganizationById(id: number): Observable<Organization> {
    return this.httpClient.get<Organization>(this.baseUrl + "organizations/" + id);
  }

  putOrganization(organization: Omit<Organization, "role">): Observable<Organization> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.token );

    return this.httpClient.put<Organization>(this.baseUrl + "organizations", organization, {headers: headers});
  }
}
