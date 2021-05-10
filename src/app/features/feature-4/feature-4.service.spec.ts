import { fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { interval, Subscription, timer } from "rxjs";
import { Events, TimerStates } from "src/app/common/interface";
import { Feature4Service } from "./feature-4.service"

describe('Feature 4 service',()=>
{
    let service:Feature4Service=null;

    beforeEach(()=>
    {
        TestBed.configureTestingModule(
            {
                providers:[Feature4Service] //No dependency, so we can directly inject it
            });
        
        service=TestBed.inject(Feature4Service); //Get the instance from the contructor token
    })

    it('should instantiate the service',()=>
    {
        expect(service).toBeTruthy('Failed to create an instance of the service');
    })

    it('should broadcast start timer event through Subject',(done:DoneFn)=> //This test case will be-
    //-Marked completed only when we call the DoneFn
    {
        service.remainingTime=100;
        service.timerSubject.subscribe(data=>
            {
                expect(data.event).toBe(Events.START,'Start event not received');
                expect(service.currentState).toBe(TimerStates.RUNNING,'Timer state not updated');
                done(); //Mark this test case as done only when we receive a timer event
            });

        service.emitTimerEvent({event:Events.START}); //Broadcase the event
    });

    it('should update the timer with each second',()=>
    {
        service.remainingTime=100;
        const perviousTime=service.remainingTime;
        service.timerTickSubject.subscribe(data=>
            {
                expect(service.remainingTime).toBe((perviousTime-1),'Remaining time is not updated');
            });

        service.timerTickEvent(); //Update the timer by 1 second;

        service.emitTimerEvent({event:Events.START});
    });

    it('should emit reset event when timer finished',fakeAsync(()=>
    {
        service.remainingTime=100;
        let perviousTime=service.remainingTime;
        service.timerTickSubject.subscribe(data=>
            {
                console.log(data);
                expect(service.remainingTime).toBe((perviousTime-1),'Remaining time is not updated');
                perviousTime--;
            });
        
        service.timerSubject.subscribe(data=>
            {
                console.debug('Reset event',data);
                if(data.event===Events.RESET)
                {
                    perviousTime=1;
                    intervalSubscription.unsubscribe();
                }
            })

        const intervalSubscription:Subscription=interval(1000).subscribe(()=>
        {   
            service.timerTickEvent(); //Update the timer by 1 second;
        })

        tick(5000);
        expect(service.remainingTime).toBe((perviousTime),'Remaining time is not updated after 5 seconds');
        
        service.emitTimerEvent({event:Events.RESET});
        expect(service.remainingTime).toBe(0,'Remaining time is not updated back to 0 seconds');
        
       
    }));
})
