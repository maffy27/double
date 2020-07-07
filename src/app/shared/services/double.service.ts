import {Injectable} from '@angular/core';
import {Subject, Observable, of, BehaviorSubject, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoubleService {


  public state: BehaviorSubject<any>;
  public state$: Observable<any>;
  public result: number;


  constructor() {
    this.state = new BehaviorSubject<any>({state: 'WAIT'});
    this.state$ = this.state.asObservable();

    timer(30000,30000).subscribe(()=>{this.state.next({state: 'WAIT'})});
    timer(20000,30000).subscribe(()=>{this.state.next({state: 'ROTATE', value: this.getValue()})});
    timer(26000,30000).subscribe(()=>{this.state.next({state: 'RESULT', value: this.result})});

  }

  private getValue() {
    this.result = Math.floor(Math.random() * 14);
    return this.result;
  }

}


// public value: Subject<number>;

// this.value = new Subject<number>();
// setInterval(()=> {
//   let val = this.getValue();
//   this.value.next(val);
// }, 12000);
