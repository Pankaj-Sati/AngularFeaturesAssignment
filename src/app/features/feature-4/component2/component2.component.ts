import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, exhaustMap, map, tap, throttleTime } from 'rxjs/operators';
import { TimerEvent,Events,TimerStates } from "src/app/common/interface";
import { Feature4Service } from '../feature-4.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.scss']
})
export class Component2Component implements OnInit {

  inputTime:number=0;

  timerLogs:Array<{id:number,message:string}>=[]

  @ViewChild('actionButtons',{static:true}) actionButtonRef:ElementRef;

  get isRunning()
  {
    return this.timerService.currentState===TimerStates.RUNNING;
  }
  constructor(private timerService:Feature4Service) { }

  ngOnInit(): void 
  {
    //Start Button
    fromEvent<any>(this.actionButtonRef.nativeElement,'click').pipe( //Event Bubbling
      throttleTime(1000), //1second delay before getting next event
      map((event:any)=>event.target.id)
    ).subscribe((buttonId:string)=>
      {
        console.log('Button ID clicked',buttonId);
        switch(buttonId)
        {
          case "startButton":
            if(this.inputTime>0)
            {
              this.startEvent();
            }
            return;
          case "pauseButton":
            this.resumePauseEvent();
            return;
          case "resetButton":
            this.resetTimerEvent();
            return;
        }
      });
  }

  get isStarted()
  {
   
    return this.timerService.currentState!==TimerStates.RESET; //Other than that, we have already started out timer
  }

  get timerValue()
  {
    return this.timerService.remainingTime;
  }

  startEvent()
  {
  
    this.timerService.emitTimerEvent({event:Events.START,payload:this.inputTime});
    this.timerLogs.push({id:this.timerLogs.length,message:`Started at ${this.inputTime}`});
  }

  resumePauseEvent()
  {
    if(this.isRunning)
    {
      //Already running, user wants to Pause
      this.timerService.emitTimerEvent({event: Events.PAUSE});
      this.timerLogs.push({id:this.timerLogs.length,message:`Paused at ${this.timerValue}`});
    }
    else
    {
      //Paused/ or reset, user wants to resume
      this.timerService.emitTimerEvent({event:Events.RESUME});
      this.timerLogs.push({id:this.timerLogs.length,message:`Resume at ${this.timerValue}`});
    }
  
  }

  resetTimerEvent()
  {
    this.timerService.emitTimerEvent({event:Events.RESET});
    this.timerLogs.push({id:this.timerLogs.length,message:`Reset at ${this.timerValue}`});
  }

  get logs()
  {
     this.timerLogs=this.timerLogs.slice(-3); //last 3 logs
     return this.timerLogs;
  }

}

