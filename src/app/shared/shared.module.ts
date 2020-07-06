import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule, MatProgressBarModule, MatButtonModule} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  exports: [
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ]
})
export class SharedModule { }
