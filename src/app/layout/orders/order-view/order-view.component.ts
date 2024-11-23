import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../services/order.service';
import { OrderValue } from '../model/order';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-order-view',
  imports: [MatCardModule, CommonModule, MatDividerModule, MatButtonModule],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.scss',
})
export class OrderViewComponent {
  // ordersArray: OrderValue[] = [];

  // constructor(private orderService: OrderService) {}

  // ngOnInit(): void {
  //   this.getOrders();
  // }

  // getOrders() {
  //   this.orderService.getAllOrders().subscribe({
  //     next: (response) => {
  //       this.ordersArray = response.data;
  //     },
  //     error: (err) => {
  //       console.log('Error Fetching orders', err);
  //     }
  //   });
  // }

  order: any;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log('iiiiiii', orderId);

    if (orderId) {
      this.getOrderDetails(orderId);
    }
  }

  getOrderDetails(orderId: string) {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.order = response.data.find(
          (order: OrderValue) => order._id === orderId
        );
        console.log('ghfhfhfghg', this.order);
      },
      error: (err) => {
        console.log('Error Fetching Order Details', err);
      },
    });
  }

  goBack(){
    this.router.navigate(['/orders'])
  }
}
