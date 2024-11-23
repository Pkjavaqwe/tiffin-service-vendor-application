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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2VjOTE4MmMxNDVlYjUwOTJmZmZhZiIsInJvbGUiOiI2NzIzNDc1Zjc0YjMyY2ZlMzllNWQwYTIiLCJpYXQiOjE3MzIyNzU5MzQsImV4cCI6MTczMjI4MzEzNH0.a_YlG4RqCuFkq5_76oE9i_fMLdovb6HhBciQlPXrQiM';
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
