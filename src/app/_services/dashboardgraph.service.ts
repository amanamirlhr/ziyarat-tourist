import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/dashboard/';

@Injectable({
  providedIn: 'root',
})
export class DashboardGraphService {
  constructor(private http: HttpClient) {}

  getTouristsByMonth(): Observable<any> {
    return this.http.get(API_URL + 'getTouriestByMonth');
  }
  getAllTourist(): Observable<any> {
    return this.http.get(API_URL + 'getAllTourist');
  }
  getAllTour(): Observable<any> {
    return this.http.get(API_URL + 'getAllTour');
  }
  getAllCountry(): Observable<any> {
    return this.http.get(API_URL + 'getAllCountry');
  }
}
