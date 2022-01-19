import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/Organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "http://localhost:3000/"

  getOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(this.baseUrl + "organizations");
  }

  getOrganizationById(id: number): Observable<Organization> {
    return this.httpClient.get<Organization>(this.baseUrl + "organizations/" + id);
  }
}
