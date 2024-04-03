import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

   
        
     

    constructor(private http: HttpClient) { }

    getAllUser():Observable<any>
    { 
      
     return this.http.get("http://127.0.0.1:8000/api/users/")
    }

    getUsersByRole(Role:any):Observable<any>
    { 
      
     return this.http.get("http://127.0.0.1:8000/api/users/user/"+Role)
    }

    deleteUser(id:any){
        return  this.http.delete("http://127.0.0.1:8000/api/users/destroy/"+id);
       }
       
    updateUser(data:any , id:any){
         console.log("data",data);
       
         return this.http.put("http://127.0.0.1:8000/api/users/update/"+id,data);
     
       } 
    saveUser(data:any):Observable<any>{
        return this.http.post("http://127.0.0.1:8000/api/users/save", data);
     }

}