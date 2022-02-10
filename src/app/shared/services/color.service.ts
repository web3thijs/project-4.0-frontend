import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: String = environment.database.toString();

  getColor(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "colors");
  }
}
