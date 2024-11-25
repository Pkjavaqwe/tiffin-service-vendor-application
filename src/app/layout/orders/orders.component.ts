import { Component, OnInit } from '@angular/core';
import { OrderService } from './services/order.service';
import { OrderValue } from './model/order';
import { TableComponent } from '../../shared/table/table.component';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  imports: [TableComponent,MatInputModule,],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  ordersArray: OrderValue[] = [];
  currentPage: number = 1;
  limit: number = 100;
  totalItems: number = 14;
  totalPages: number = 0;
  pagesize:number=0;

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrders(this.currentPage, this.limit);
  }

  getOrders(currentPage: number,
    limit: number) {
    console.log('giguguguuguu');

    this.orderService.getAllOrders(currentPage,limit).subscribe({
      next: (response) => {
        console.log('resppnsnsjdj', response.data);
        this.ordersArray = response.data;
        this.totalItems = response.pagination.totalItems;
        this.totalPages = response.pagination.totalPages;
        console.log("total items",this.totalPages);
        
      },
      error: (err) => console.log('Error Fetching orders', err),
    });
  }

  onPageChange(event:PageEvent){
    const{pageSize, pageIndex}=event;
    this.pagesize=pageSize
    if(pageIndex<=this.totalPages){
      this.getOrders(pageIndex+1, this.pagesize);
    }
  }

  // getAdminRequestsByStatus(
  //   status: string,
  //   currentPage: number,
  //   limit: number
  // ): void {
  //   console.log('Fetching admin requests for status:', status);
  //   this.superAdminService
  //     .getRequestsByStatus(status, currentPage, limit)
  //     .subscribe({
  //       next: (adminData) => {
  //         this.adminsArray = adminData.data;
  //         this.allAdminsArray = adminData.data;
  //         this.totalItems = adminData.pagination.totalItems;
  //         this.totalPages = Math.ceil(this.totalItems / this.limit);
  //         console.log('Fetched Admin Requests:', this.adminsArray);
  //         console.log('Total Pages:', this.totalPages);
  //       },
  //       error: (err) => {
  //         console.error('Error fetching admin requests:', err);
  //       },
  //     });
  // }

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
