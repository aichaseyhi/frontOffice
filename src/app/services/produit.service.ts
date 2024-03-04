import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getAllProduct():Observable<any>
    { 
      
     return this.http.get("http://127.0.0.1:8000/api/produits")
    }

    deleteProduct(id:any){
        return  this.http.delete("http://127.0.0.1:8000/api/deleteProduit/"+id);
       }
       
    updateProduct(data:any , id:any){
         console.log("data",data);
       
         return this.http.put("http://127.0.0.1:8000/api/updateProduit/"+id,data);
     
       } 
    saveProduct(data:any):Observable<any>{
        return this.http.post("http://127.0.0.1:8000/api/saveProduit", data);
     }
}
