import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

  @Input()
  remainingTime:number=0; //This value will be received as an input to this component

  constructor() { }

  ngOnInit(): void {
  }

}
