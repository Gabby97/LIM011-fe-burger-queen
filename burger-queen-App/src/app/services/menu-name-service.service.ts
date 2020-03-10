import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuNameService {
  private menuNameSource = new BehaviorSubject('breakfast');
  currentString = this.menuNameSource.asObservable();
  constructor() { }
  changeString(value){
    this.menuNameSource.next(value);
  }
  todayDate(){
    let ndate = new Date();
    return ndate;
  }

  private arrOrder = new BehaviorSubject([]);
  currentProduct = this.arrOrder.asObservable();
  changeProduct(obj){
    // console.log(this.arrOrder.value);
    // const newArrOrder = this.arrOrder.value.concat(obj);
    const newArrOrder =  [{...this.arrOrder.value, ...obj}]
    // console.log(newArrOrder);
    this.arrOrder.next(newArrOrder);
    
  }

}

