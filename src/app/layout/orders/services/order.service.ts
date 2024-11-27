import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllOrders(currentPage:number,pagesize:number): Observable<OrderApiResponse> {
    const param = {
      page: currentPage,
      limit: pagesize,
    };
    const orderObservable = this.http.get<OrderApiResponse>(
      `${this.url}/getallorders`,{params:param}
    );
    console.log('in order service', orderObservable);
    return orderObservable;
  }
  // cancelOrder(orderId: string): Observable<any> {
  //   const url = `${this.url}/cancelorder/${orderId}`;
  //   return this.http.get<any>(url, {});
  // }

  // searchOrders(query: string): Observable<any> {
  //   const params = new HttpParams().set('query', query);

  //   const obs= this.http.get<any>(`${this.url}/searchorders`, {
  //     params: params,
  //   });
  //   console.log("in search..",obs);
  //   return obs;
    
  // }
  searchOrders(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);

    const obs= this.http.get<any>(`${this.url}/searchorders`, {
      params: params,
    });
    console.log("in search..",obs);
    return obs;
    
  }
}
