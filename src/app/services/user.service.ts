import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any[] | undefined;
  emailFilter: any;
  nameFilter: any;

  constructor(private http: HttpClient) { }

  filterUser(name: string, email: string): Observable<any> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (email) {
      params = params.set('email', email);
    }
    return this.http.get<any>('http://127.0.0.1:8000/api/filterUser', { params });
  }

  getAllUsers(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/users/");
  }

  getUsersByRole(role: any): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/users/user/" + role);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete("http://127.0.0.1:8000/api/users/destroy/" + id);
  }

  updateUser(data: any, id: any): Observable<any> {
    console.log("data", data);
    return this.http.put("http://127.0.0.1:8000/api/users/update/" + id, data);
  }
  updateUserStatus(id: any, status: string): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/users/updateUserStatus/${id}`, { status });
  }

  saveUser(data: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/users/save", data);
  }
}
