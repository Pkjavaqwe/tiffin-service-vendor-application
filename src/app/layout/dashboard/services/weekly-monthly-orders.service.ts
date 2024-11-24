import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OrderApiResponse } from '../../orders/model/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeeklyMonthlyOrdersService {
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2VjOTE4MmMxNDVlYjUwOTJmZmZhZiIsInJvbGUiOiI2NzIzNDc1Zjc0YjMyY2ZlMzllNWQwYTIiLCJpYXQiOjE3MzI0NTM3NTcsImV4cCI6MTczMjQ2MDk1N30.zDahAyqPb4iqk2whoz0khuOKlrKvWe2XQG2MpKNZrQw';
  constructor(private http: HttpClient) {}
  url = environment.apiEndpoint + '/retailers';

  getAllWeeklyAndMonthlyOrders(
    filter: 'week' | 'month',
    status: string,
    year: number
  ): Observable<OrderApiResponse> {
    // Prepare the query parameters
    const params = new HttpParams()
      .set('filter', filter)
      .set('status', status)
      .set('year', year.toString());

    // Make the GET request with the headers and parameters
    return this.http.get<OrderApiResponse>(
      `${this.url}/getweeklymonthlyorders`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
        params: params,
      }
    );
  }
}
