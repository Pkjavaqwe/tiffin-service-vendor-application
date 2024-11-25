import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OrderApiResponse } from '../model/order';
import { Observable } from 'rxjs';

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
    return this.http.put<any>(url, {});
  }
}
