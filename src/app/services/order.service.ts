import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(orderData: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/orders/save", orderData);
  }

  getOrders(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/orders");
  }

  filterOrdersByStatus(status: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/orders/filterOrders?status=${status}`);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/orders/updateOrderStatus/${orderId}`, { "status": newStatus });
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/orders/delete/${orderId}`);
  }
}
