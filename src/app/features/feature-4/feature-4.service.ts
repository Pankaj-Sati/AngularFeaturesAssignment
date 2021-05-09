import { Injectable } from "@angular/core";
import { interval, Subject, Subscription } from "rxjs";
import { Events, TimerEvent, TimerStates } from "src/app/common/interface";

@Injectable()
export class Feature4Service
{
    remainingTime:number=0; //Time remaining

    currentState:string=TimerStates.RESET; //Default State

    timerSubject=new Subject<TimerEvent>(); //To broadcase the timer events

    timerTickSubject=new Subject<number>(); //To broadcast the tick event

    constructor()
    {

    }


    emitTimerEvent(event:TimerEvent)
    {
        //Sends the timer event
        console.log({sendingNewEvent:event});
       
        switch(event.event)
        {
            case Events.START:
                this.remainingTime=event.payload;
                this.startTimer();
                break;
            case Events.RESUME:
                this.startTimer();
                break;
            case Events.PAUSE:
                this.pauseTimer();
                break;
            default:
                this.resetTimer();
                break;
        }
    }

    resetTimer()
    {
        this.remainingTime=0;
        this.currentState=TimerStates.RESET;
        this.timerSubject.next({event:Events.RESET});
        this.timerTickSubject.next(0);
        console.log('Reset Timer');
    }

    startTimer()
    {
        if(this.remainingTime<=0)
        {
            this.remainingTime=0;
            this.currentState=TimerStates.RESET;
            this.timerSubject.next({event:Events.RESET});
        }
        else
        {
            this.timerSubject.next({event:Events.START,payload:this.remainingTime});
            this.currentState=TimerStates.RUNNING;
        }
    }

    pauseTimer()
    {
        this.currentState=TimerStates.PAUSED;
        this.timerSubject.next({event:Events.PAUSE});  
    }

    reset()
    {
        this.currentState=TimerStates.RESET;
        this.remainingTime=0;
    }
    
}