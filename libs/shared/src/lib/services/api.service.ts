import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(url);
  }

  post(url: string, payload: any, options?: any): Observable<any> {
    return this.http.post<any>(url, payload, options);
  }

  put(url: string, payload: any, options?: any): Observable<any> {
    return this.http.put<any>(url, payload, options);
  }

  patch(url: string, payload: any, options?: any): Observable<any> {
    return this.http.patch<any>(url, payload, options);
  }
}
