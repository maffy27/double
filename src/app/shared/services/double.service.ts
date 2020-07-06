import {Injectable} from '@angular/core';
import {Subject, Observable, of, BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoubleService {

  public value: Subject<number>;

  constructor() {
    this.value = new Subject<number>();
    setInterval(()=> {
      let val = this.getValue();
      this.value.next(val);
    }, 12000);
  }

  private getValue(): number {
    return Math.floor(Math.random() * 14);
  }

}
