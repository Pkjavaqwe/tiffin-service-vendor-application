import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageSource= new BehaviorSubject<string>('')
  public currentImage=this.imageSource.asObservable()
  constructor() { }

  updateImage(image:string){
    this.imageSource.next(image)
  }
}
