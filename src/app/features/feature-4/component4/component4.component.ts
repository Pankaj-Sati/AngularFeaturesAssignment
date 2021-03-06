import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/common/interface';
import { Feature4Service } from '../feature-4.service';

@Component({
  selector: 'app-component4',
  templateUrl: './component4.component.html',
  styleUrls: ['./component4.component.scss']
})
export class Component4Component implements OnInit,OnDestroy {

  startButtonClicks:number=0;
  pauseButtonClicks:number=0;
  private timerSubscription:Subscription;
  constructor(private timerService:Feature4Service)
  {

  }

  ngOnInit()
  {
     this.timerSubscription= this.timerService.timerSubject.pipe(
      ).subscribe(event=>
          {
              switch(event.event)
              {
                  case Events.START:
                      this.startButtonClicks++;
                      break;
                  case Events.RESUME:
                     this.startButtonClicks++;
                      break;
                  case Events.PAUSE:
                      this.pauseButtonClicks++;
                      break;
                  default:
                      break;
              }
          })
  }

  ngOnDestroy()
  {
      this.timerSubscription.unsubscribe();
  }

}
