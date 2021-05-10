import { Component, OnDestroy, ViewChild } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { TimerEvent,Events,TimerStates } from "src/app/common/interface";
import { Component3Component } from "./component3/component3.component";
import { Component4Component } from "./component4/component4.component";
import { Feature4Service } from "./feature-4.service";


@Component(
    {
        selector:'feature-4',
        styleUrls:['./feature-4.component.scss'],
        templateUrl:'./feature-4.component.html'
    })
export class Feature4Component implements OnDestroy
{
    errorMessage='';
    timer:Subscription;
    timerSubjectSubscription:Subscription;
    constructor(private timerService:Feature4Service)
    {

    }

    ngOnInit()
    {
        this.timerSubjectSubscription=this.timerService.timerSubject.pipe(
            tap(console.log)
        ).subscribe(event=>
            {

                this.errorMessage=null;
                switch(event.event)
                {
                    case Events.START:
                        this.startTimer();
                        break;
                    case Events.RESUME:
                       this.startTimer();
                        break;
                    case Events.PAUSE:
                        this.stopTimer();
                        break;
                    default:
                       this.stopTimer();
                       this.errorMessage="Timer Finished";
                        break;
                }
            })
    }

    startTimer()
    {
        this.timerService.timerTickSubject.next(this.timerService.remainingTime);
        this.timer=interval(1000).subscribe(()=>
        {
            this.timerService.timerTickEvent();
           
        });
    }

    stopTimer()
    {
        if(this.timer)
        {
            this.timer.unsubscribe();
        }
        this.timer=null;
    }

    ngOnDestroy()
    {
        if(this.timer)
        {
            this.timer.unsubscribe();
        }
        this.timerSubjectSubscription.unsubscribe();
        this.timerService.reset();
    }

}

