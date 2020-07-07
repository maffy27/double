import {Component, ElementRef, OnInit, AfterViewInit, PipeTransform, Pipe} from '@angular/core';
import {DoubleService} from "../shared/services/double.service";
import {transition, trigger, style, animate, group, query, keyframes} from "@angular/animations";
import {interval, Observable, timer} from "rxjs";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-double',
  templateUrl: './double.component.html',
  styleUrls: ['./double.component.scss'],
  animations: [
    trigger(
      'inAnimation',
      [
        transition(':enter',
          [
            style({opacity: 0}),
            animate('0.5s ease-out',
              style({opacity: 1}))
          ]
        )
      ]
    ),
    trigger('profileAnimation', [
      transition(':enter',
        query('#bar',
          [
            style({'stroke-dashoffset': 566}),
            animate('20000ms ease-in',
              style({'stroke-dashoffset': 41})
            )
          ]
        ),
      )
    ]),
    trigger('flipAnimation', [
      transition(':enter', [
        style({'transform': 'rotateY(0deg)'}),
        animate('1s ease-in',
          style({'transform': 'rotateY(90deg)'})
        )
      ])
    ])
  ]
})
export class DoubleComponent implements OnInit {

  counter = 1200;

  public winDegree: number = 0;
  public doubleGameHistory: Array<number> = [];
  public status: string;
  public state$;
  public red = [0, [25, 48], [73, 96], [121, 144], [169, 192], [217, 240], [265, 288], [313, 336]];
  public black = [0, 0, 0, 0, 0, 0, 0, 0, [49, 72], [97, 120], [145, 168], [193, 216], [241, 264], [289, 312], [337, 360]];


  constructor(private elRef: ElementRef,
              private ds: DoubleService) {
  }


  ngOnInit() {
    this.state$ = this.ds.state$.subscribe((obj)=> {
      this.status = obj.state;
      // console.log(obj);
      if (obj.state === 'ROTATE') {
        this.rotateRoulette(obj.value)
      }
      if (obj.state === 'RESULT') {
        this.addHistory(obj.value)
      }
      if (obj.state === 'WAIT') {
        this.counter = 1200;
        this.setTimer()
      }
    });
  }

  public rotateRoulette(value: number): void {
    let temp = this.getDegrees(value);
    this.winDegree += 1800 + 24 - temp;
    this.elRef.nativeElement.querySelector('.roulette').style.transform = `rotate(${this.winDegree}deg)`;
    this.winDegree += temp - 24;
  }

  public getDegrees(value: number): number {
    let deg;
    if (value > 0 && value < 8) {
      console.log('This is red');
      deg = this.red[value];
      return Math.floor(Math.random() * (deg[1] - deg[0]) + deg[0]);
    } else if (value >= 8) {
      console.log('This is black');
      deg = this.black[value];
      return Math.floor(Math.random() * (deg[1] - deg[0]) + deg[0]);
    } else {
      console.log('This is green');
      return Math.floor(Math.random() * 24);
    }
  }

  public addHistory(value): void {
    if (this.doubleGameHistory.length > 7) {
      this.doubleGameHistory.pop()
    }
    this.doubleGameHistory.unshift(value);
  }

  public getColor(value: number): string {
    if (value > 0 && value < 8) {
      return 'red';
    } else if (value >= 8) {
      return 'black';
    } else {
      return 'green';
    }
  }

  public setTimer() {
    let subscription =timer(0, 17).subscribe(() => {
      if(this.counter == 0) {subscription.unsubscribe()}
      --this.counter;
    });
  }

}

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}

