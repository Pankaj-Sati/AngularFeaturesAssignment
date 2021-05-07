import { Component, ViewChild } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { Events, TimerEvent,TimerStates } from "src/app/common/interface";
import { Component3Component } from "./component3/component3.component";
import { Component4Component } from "./component4/component4.component";

@Component(
    {
        selector:'feature-3',
        styleUrls:['./feature-3.component.scss'],
        templateUrl:'./feature-3.component.html'
    })
export class Feature3Component
{
    remainingTime:number=0; //Time remaining
    errorMessage='';
    currentState:string=TimerStates.RESET; //Default State

    timer:Subscription=null;

    @ViewChild(Component3Component) component3Ref:Component3Component;
    @ViewChild(Component4Component) component4Ref:Component4Component;

    constructor()
    {

    }

    timerEvent(event:TimerEvent)
    {
        //Receives the start timer event
        console.log({newEventReceived:event});
        let timerLogsLength=this.component3Ref.timerLogs.length;
        switch(event.event)
        {
            case Events.START:
                this.remainingTime=event.payload;
                this.component4Ref.startButtonClicks++;
                this.startTimer();
                break;
            case Events.RESUME:
                this.startTimer();
                this.component4Ref.startButtonClicks++;
                break;
            case Events.PAUSE:
                this.pauseTimer();
                this.component4Ref.pauseButtonClicks++;
                break;
            default:
                this.resetTimer();
                break;
        }
        console.log('this.component3Ref.timerLogs',this.component3Ref.timerLogs);
        this.component3Ref.timerLogs.push({id:timerLogsLength,message:`${event.event} at ${new Date().toISOString()}`});
    }

    resetTimer()
    {
        if(this.timer)
        {
            this.timer.unsubscribe();
            this.timer=null;
        }
        this.remainingTime=0;
        this.currentState=TimerStates.RESET;
        console.log('Reset Timer');
    }

    startTimer()
    {
        if(this.remainingTime<=0)
        {
            this.remainingTime=0;
            this.errorMessage="Timer finished";
            this.currentState=TimerStates.RESET;
        }
        else
        {
            if(this.timer)
            {
                this.timer.unsubscribe();
            }
            this.errorMessage="";

            this.timer=interval(1000).subscribe(()=>
            {
                //Every 1 second this timer will tick
                if(this.remainingTime>0)
                {
                    this.remainingTime--;
                    this.currentState=TimerStates.RUNNING;
                }
                else
                {
                    this.remainingTime=0;
                    this.errorMessage="Timer finished";
                    this.timer.unsubscribe(); //Unsubscribe 
                    this.timer=null;
                    this.currentState=TimerStates.RESET;
                }
            })
        }
    }

    pauseTimer()
    {
        if(this.timer)
        {
            this.timer.unsubscribe();
            this.timer=null;
            this.currentState=TimerStates.PAUSED;
        }
    }
    

}
