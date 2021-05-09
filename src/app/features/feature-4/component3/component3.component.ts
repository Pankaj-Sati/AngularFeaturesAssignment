import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/common/interface';
import { Feature4Service } from '../feature-4.service';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.scss']
})
export class Component3Component implements OnInit,OnDestroy {

  public timerLogs:Array<{id:number,message:string}>=[];
  private timerSubscription:Subscription;

  constructor(private timerService:Feature4Service)
  {

  }

  ngOnInit()
  {
     this.timerSubscription= this.timerService.timerSubject.pipe(
      ).subscribe(event=>
          {
            this.timerLogs.push({id:this.timerLogs.length,message:`${event.event} at ${new Date().toISOString()}`});
          })
  }

  ngOnDestroy()
  {
    this.timerSubscription.unsubscribe();
  }
}
