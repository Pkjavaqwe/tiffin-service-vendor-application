import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderApiResponse } from '../../model/order';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  url = environment.apiEndpoint + '/retailers';

  getAllOrders(): Observable<OrderApiResponse> {
    const orderObservable = this.http.get<OrderApiResponse>(
      `${this.url}/getallorders`
    );
    console.log('in order service', orderObservable);
    return orderObservable;
  }
  cancelOrder(orderId: string): Observable<any> {
    const url = `${this.url}/cancelorder/${orderId}`;
    return this.http.get<any>(url, {});
  }
}
