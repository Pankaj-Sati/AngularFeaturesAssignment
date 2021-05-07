import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Feature4Service } from '../feature-4.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

  remainingTime$:Observable<number>;

  constructor(private timerService:Feature4Service) { }

  ngOnInit(): void 
  {
    this.remainingTime$=this.timerService.timerTickSubject;
  }


}
