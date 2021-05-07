import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component4',
  templateUrl: './component4.component.html',
  styleUrls: ['./component4.component.scss']
})
export class Component4Component implements OnInit {

  startButtonClicks:number=0;
  pauseButtonClicks:number=0;
  constructor() { }

  ngOnInit(): void {
  }

}
