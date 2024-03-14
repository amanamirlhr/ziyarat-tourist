import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './apilink';

const API_URL = 'http://localhost:5000/api/tourist/';

@Injectable({
  providedIn: 'root',
})
export class TouristService {
  constructor(private http: HttpClient) {}

  getTouriestName(): Observable<any> {
    return this.http.get(API_URL + 'getTouriestName');
  }
}
