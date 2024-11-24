import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OrderApiResponse } from '../model/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2VjOTE4MmMxNDVlYjUwOTJmZmZhZiIsInJvbGUiOiI2NzIzNDc1Zjc0YjMyY2ZlMzllNWQwYTIiLCJpYXQiOjE3MzI0NTM3NTcsImV4cCI6MTczMjQ2MDk1N30.zDahAyqPb4iqk2whoz0khuOKlrKvWe2XQG2MpKNZrQw';
  constructor(private http: HttpClient) {}
  url = environment.apiEndpoint + '/retailers';

  getAllOrders(): Observable<OrderApiResponse> {
    const orderObservable = this.http.get<OrderApiResponse>(
      `${this.url}/getallorders`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    console.log('in order service', orderObservable);
    return orderObservable;
  }
}
