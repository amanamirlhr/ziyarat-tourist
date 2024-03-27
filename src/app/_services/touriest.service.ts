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
//   postTour(data: any): Observable<any> {
//     return this.http.post(API_URL + 'createTour',data);
//   }
//   updateTour(data: any, tourId: string): Observable<any> {
//     return this.http.put(API_URL + 'updateTour/' + tourId, data);
//   }
}
