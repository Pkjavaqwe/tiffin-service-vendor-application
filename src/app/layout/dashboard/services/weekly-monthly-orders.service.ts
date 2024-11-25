import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OrderApiResponse } from '../../orders/model/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeeklyMonthlyOrdersService {
 
  constructor(private http: HttpClient) {}
  url = environment.apiEndpoint + '/retailers';

  getAllWeeklyAndMonthlyOrders(
    filter: 'week' | 'month',
    status: string,
    year: number
  ): Observable<OrderApiResponse> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('status', status)
      .set('year', year.toString());

    return this.http.get<OrderApiResponse>(
      `${this.url}/getweeklymonthlyorders`,{params}
      
    );
  }
}
