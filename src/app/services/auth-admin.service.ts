import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(private http: HttpClient) { }

  login(bodyData: any): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>("http://127.0.0.1:8000/api/login", bodyData, { observe: 'response' });
  }

  register(bodyData: any): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>("http://127.0.0.1:8000/api/register", bodyData, { observe: 'response' });
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>("http://127.0.0.1:8000/api/logout", null, { observe: 'response' });
  }

}
