import { Component, OnInit } from '@angular/core';
import { OrderService } from './services/order.service';
import { OrderValue } from './model/order';
import { TableComponent } from '../../shared/table/table.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-orders',
  imports: [TableComponent,MatInputModule,],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  ordersArray: OrderValue[] = [];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    console.log('giguguguuguu');

    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        console.log('resppnsnsjdj', response.data);
        this.ordersArray = response.data;
      },
      error: (err) => console.log('Error Fetching orders', err),
    });
  }
  orderColumns = [
    // { name: '_id', header: 'Order ID' },
    { name: 'customer_name', header: 'Customer Name' },

    { name: 'payment_mode', header: 'Payment mode' },

    { name: 'payment_status', header: 'Payment Status' },
    { name: 'delivery_status', header: 'Delivery Status' },
    { name: 'price', header: 'Price' },
    { name: 'created_at', header: 'Date', pipe: 'date' },
    { name: 'isActive', header: 'Is Active' }
  ];
  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }
}
