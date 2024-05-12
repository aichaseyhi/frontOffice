import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private apiUrl = 'http://127.0.0.1:8000/api/subCategory';

  constructor(private http: HttpClient) { }

  getSubcategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  saveSubcategory(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/subCategories/save', data);
  }
  deleteSubcategory(id:any){
    return  this.http.delete("http://127.0.0.1:8000/api/subCategories/destroy/"+id);
   }
}
