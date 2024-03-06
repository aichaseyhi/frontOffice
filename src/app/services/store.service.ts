import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAllStore():Observable<any>
    { 
      
     return this.http.get("http://127.0.0.1:8000/api/stores")
    }

    deleteStore(id:any){
        return  this.http.delete("http://127.0.0.1:8000/api/deleteStore/"+id);
       }
       
    updateStore(data:any , id:any){
         console.log("data",data);
       
         return this.http.put("http://127.0.0.1:8000/api/updateStore/"+id,data);
     
       } 
    saveStore(data:any):Observable<any>{
        return this.http.post("http://127.0.0.1:8000/api/saveStore", data);
     }
}
