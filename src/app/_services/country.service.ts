import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './apilink';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
    private apiUrl = environment.apiUrl;
  constructor(private _http: HttpClient) {}
  getCountries(): Observable<any> {
    debugger
    const url = `${this.apiUrl}getCountries`;
    return this._http.get(url);
  }
}
