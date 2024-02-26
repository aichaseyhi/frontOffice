import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(bodyData: any):Observable<HttpResponse<any>>{

    return this.http.post("http://127.0.0.1:8000/api/login",bodyData,{observe:'response'})
   }
   register(bodyData: any):Observable<HttpResponse<any>>{

    return this.http.post("http://127.0.0.1:8000/api/register",bodyData,{observe:'response'})
   }

   logout():Observable<HttpResponse<any>> {
    
   return this.http.post("http://127.0.0.1:8000/api/logout",null,{observe:'response'} )
   }
  
}
