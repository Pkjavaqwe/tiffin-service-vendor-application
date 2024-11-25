import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CloudinaryResponse, Tiffin, TiffinApiResponse } from '../models/tiffin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(currentPage: number, pagesize: number): Observable<TiffinApiResponse> {

    let param = {
      page: currentPage,
      limit: pagesize
    }
    const getTiffinUrl = environment.apiEndpoint + '/retailers/tiffinItems/getalltiffin';
    return this.http.get<TiffinApiResponse>(getTiffinUrl, { params: param });
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
  uploadTiffinImage(file: File): Observable<CloudinaryResponse> {
    const baseUrlOrgImage = environment.apiEndpoint + '/auth/uploaduserimage'
    let formData = new FormData();
    formData.append('recfile', file)
    const observableData = this.http.post<CloudinaryResponse>(
      baseUrlOrgImage,
      formData
    );
    return observableData;
  }
}
