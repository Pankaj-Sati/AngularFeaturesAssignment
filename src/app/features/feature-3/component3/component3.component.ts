import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.scss']
})
export class Component3Component implements OnInit {

  public timerLogs:Array<{id:number,message:string}>=[];

  constructor() { }

  ngOnInit(): void {
  }
}