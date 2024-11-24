import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Tiffin, TiffinApiResponse } from '../models/tiffin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<TiffinApiResponse> {
    const getTiffinUrl = environment.apiEndpoint + '/retailers/tiffinItems/getalltiffin';
    return this.http.get<TiffinApiResponse>(getTiffinUrl);
  }

  getOneTiffinById(_id: string): Observable<TiffinApiResponse> {
    const getOneTiffinUrl = environment.apiEndpoint + '/retailers/tiffinItems/gettiffinbyid/' + _id;
    return this.http.get<TiffinApiResponse>(getOneTiffinUrl);
  }
  addTiffinByRetailer(tiffin: Tiffin) {
    const addTiffinUrl = environment.apiEndpoint + '/retailers/tiffinItems/addtiffin';
    return this.http.post<TiffinApiResponse>(addTiffinUrl, tiffin);

  }
  updateTiffinById(id: string, tiffin: Tiffin) {
    // console.log('Update tiffin', tiffin.);

    const updateTiffinUrl = environment.apiEndpoint + '/retailers/tiffinItems/updatetiffin/' + id;
    return this.http.put<TiffinApiResponse>(updateTiffinUrl, tiffin);
  }
}
