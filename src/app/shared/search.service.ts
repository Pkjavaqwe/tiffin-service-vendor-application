import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSubject = new Subject<string>();
  setFilter(query: string) {
    this.searchSubject.next(query);
  }
  getFilter() {
    return this.searchSubject.asObservable();
  }
}
