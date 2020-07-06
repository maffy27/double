import {Component, ElementRef, OnInit} from '@angular/core';
import {DoubleService} from "../shared/services/double.service";
import {transition, trigger, style, animate} from "@angular/animations";

@Component({
  selector: 'app-double',
  templateUrl: './double.component.html',
  styleUrls: ['./double.component.scss'],
  animations: [
    trigger(
      'inAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            // style({transform: 'scale(0.5)', height: 0}),
            animate('0.5s ease-out',
              style({opacity: 1}))
            // style({transform: 'scale(1)', height: 48}))
          ]
        )
      ]
    )
  ]
})
export class DoubleComponent implements OnInit {

  public winDegree: number = 0;
  public doubleGameHistory: Array<number> = [];
  public statusBarValue: number = 0;
  public red = [0, [25, 48], [73, 96], [121, 144], [169, 192], [217, 240], [265, 288], [313, 336]];
  public black = [0, 0, 0, 0, 0, 0, 0, 0, [49, 72], [97, 120], [145, 168], [193, 216], [241, 264], [289, 312], [337, 360]];


  constructor(private elRef: ElementRef,
              private ds: DoubleService) {
    this.ds.value.subscribe((value)=> {
      console.log(value);
      // this.statusBar();
      this.rotateRoulette(value);
      setTimeout(()=> {
        this.addHistory(value);
      }, 6050)
    });

  }

  ngOnInit() {
    this.statusBar(120);
  }

  public rotateRoulette(value: number): void {
    // let value = Math.floor(Math.random() * (14 - 0) + 0);
    let temp = this.getDegrees(value);
    this.winDegree += 1800 + 24 - temp;
    console.log(this.winDegree);
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
    this.statusBar(200);
  }

  public getClass(value: number): string {
    if (value > 0 && value < 8) {
      return 'red';
    } else if (value >= 8) {
      return 'black';
    } else {
      return 'green';
    }
  }


  public statusBar(time: number): void {
    // this.statusBarValue=0;
    // console.log('status bar');
    // setInterval(()=> {
    //   this.statusBarValue += 1;
    // }, time)
  }

}
