import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allOrganization } from '../model/organization';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  baseUrlOrg = environment.apiEndpoint + '/superadmin/organizations/getallOrganization';
url=environment.apiEndpoint+'/retailers'
  constructor(private http: HttpClient) { }

  getAllOrganizationsApi(): Observable<allOrganization> {
    // const params = new HttpParams()
    //   .set('page', page.toString())
    //   .set('limit', limit.toString());
    const observableData = this.http.get<allOrganization>(this.baseUrlOrg);
    return observableData;
  }

  addRequest(organizationId: string, location: string): Observable<any> {
console.log("location", location);


    return this.http.put<any>(
      `${this.url}/addRequest/${organizationId}/?org_location=${location}`, 
      {},  
    );
  }
}
