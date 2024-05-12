import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  updateProductStatus(productId: number | undefined, newStatus: string): Observable<any> {
    const body = { status: newStatus };
    return this.http.put(`http://127.0.0.1:8000/api/products/updateStatus/${productId}`, body);
  }

  constructor(private http: HttpClient) { }


    getAllProduct():Observable<any>
    {
     return this.http.get("http://127.0.0.1:8000/api/products",)
    }

    deleteProduct(id:any){
        return  this.http.delete("http://127.0.0.1:8000/api/products/delete/"+id);
       }

    updateProduct(data:any , id:any){
         console.log("data",data);

         return this.http.put("http://127.0.0.1:8000/api/products/update/"+id,data);

       }
    saveProduct(data:any):Observable<any>{
        //data.category = [1];
        data.subcategory = []
        return this.http.post("http://127.0.0.1:8000/api/products/save", data);
     }

}
