import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://backend-jolien.herokuapp.com/api/";

  getSizes(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "sizes");
  }

}
