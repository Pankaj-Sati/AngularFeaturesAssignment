import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, exhaustMap, throttleTime } from "rxjs/operators";

@Component(
    {
        selector:'feature-6',
        styleUrls:['./feature-6.component.scss'],
        templateUrl:'./feature-6.component.html'
    })
export class Feature6Component implements OnInit
{
    gridView=true; //To swithc between grid and list view
    products:Array<{name:string}>=[];

    @ViewChild('container',{static:true}) containerDivRef:ElementRef;

    constructor()
    {
        for(let i=0;i<20;i++) //Lets add 50 divs initially
        {
            this.products.push({name:`Button ${i+1}`});
        }
    }

    ngOnInit()
    {
        fromEvent(document,'scroll').pipe(
            debounceTime(100)
        )
        .subscribe((event:any)=>
            {
                let bufferHeight=400; //Buffer height so that we can load items before reaching last

                let windowHeight=window.innerHeight;
                let lastVisibleProductDiv=this.containerDivRef.nativeElement.children[this.products.length-1];
                let lastDivTop=lastVisibleProductDiv.getBoundingClientRect().top
                console.log({lastDivTop:lastDivTop,
                        windowHeight:windowHeight});

                if(lastDivTop<=(windowHeight+bufferHeight))
                {
                    //User has scrolled to last div
                    for(let i=1;i<=5;i++)
                    {
                        this.products.push({name:`Button ${this.products.length+i}`});
                    }
                }
        
            })
    }

    buttonClick(product)
    {
        alert(`${product.name} clicked`);
    }

}