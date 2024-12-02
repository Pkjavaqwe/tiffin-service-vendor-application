import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { OrderValue } from '../model/order';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from './services/order.service';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../shared/snackbar.service';
@Component({
  selector: 'app-order-view',
  imports: [MatCardModule, CommonModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.scss',
})
export class OrderViewComponent {
  order: any = {};
  ordersArray: OrderValue[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log('iiiiiii', orderId);

    if (orderId) {
      this.orderService.getAllOrders().subscribe({
        next: (response) => {
          this.ordersArray = response.data;
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
  }


  // getOrderDetails(orderId: string) {
  //   this.orderService.getAllOrders().subscribe({
  //     next: (response) => {
  //       this.order = response.data.find(
  //         (order: OrderValue) => order._id === orderId
  //       );
  //       console.log('ghfhfhfghg', this.order);
  //     },
  //     error: (err) => {
  //       console.log('Error Fetching Order Details', err);
  //     },
  //   });
  // }

  goBack() {
    this.router.navigate(['/layout/orders']);
  }

  cancelOrder(orderId: string): void {
    console.log("in cancel", orderId);

    const obs = this.orderService.cancelOrder(orderId)
    console.log("cancel order...", obs);

    obs.subscribe(
      (response) => {
        if (response.success) {
          this.snackbar.showSuccess(response.message);
          this.updateOrderStatus(orderId, 'cancelled');
        } else {
          this.snackbar.showError(response.message);
        }
      },
      (error) => {
        console.error("Error canceling the order", error);
        this.snackbar.showError("An error occurred while canceling the order.");
      }
    );
  }

  updateOrderStatus(orderId: string, newStatus: string): void {
    console.log("update", orderId);

    console.log("Current orders:", this.ordersArray);

    const orderIndex = this.ordersArray.findIndex(order => order._id === orderId); console.log("Found order index:", orderIndex);
    if (orderIndex !== -1) {
      console.log("index", this.ordersArray[orderIndex].delivery_status);

      this.ordersArray[orderIndex].delivery_status = newStatus;
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      console.error(`Order with ID ${orderId} not found.`);
    }

  }



  changeStatus(orderId: string) {
    console.log("in delivery", orderId);

    const obs = this.orderService.confirmPayment(orderId);
    obs.subscribe({
      next: (response) => {
        console.log("payment...", response);
        this.snackbar.showSuccess("Payment done successfully...")
        this.router.navigate(['/layout/orders']);
      }
    })
  }
}
