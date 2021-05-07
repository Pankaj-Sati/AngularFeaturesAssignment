import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/common/interface';
import { Feature4Service } from '../feature-4.service';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.scss']
})
export class Component3Component implements OnInit {

  public timerLogs:Array<{id:number,message:string}>=[];

  constructor(private timerService:Feature4Service)
  {

  }

  ngOnInit()
  {
      this.timerService.timerSubject.pipe(
      ).subscribe(event=>
          {
            this.timerLogs.push({id:this.timerLogs.length,message:`${event.event} at ${new Date().toISOString()}`});
          })
  }
}
