import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/tourist/';

@Injectable({
  providedIn: 'root',
})
export class TouriestService {
  constructor(private http: HttpClient) {}

  getAllTouriest(): Observable<any> {
    return this.http.get(API_URL + 'getTourists');
  }
  postTourist(data: any): Observable<any> {
    debugger
    return this.http.post(API_URL + 'createTourist',data);
  }
}
