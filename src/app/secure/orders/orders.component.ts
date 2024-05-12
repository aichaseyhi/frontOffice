import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  status?: string;

updateOrderStatus(arg0: any) {
throw new Error('Method not implemented.');
}
  @Input() orders: any[] = [];
openNew() {
throw new Error('Method not implemented.');
}
createOrder(arg0: any) {
throw new Error('Method not implemented.');
}

  selectedOrders: any[] = [];
  EditOrders: any[] = [];


  ngOnInit(): void {
  }


  deleteSelectedOrders() {
    // Implement the logic to delete selected orders here
  }
}
