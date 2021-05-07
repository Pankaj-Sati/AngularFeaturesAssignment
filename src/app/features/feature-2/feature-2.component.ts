import { Component } from "@angular/core";

@Component(
    {
        selector:'feature-2',
        styleUrls:['./feature-2.component.scss'],
        templateUrl:'./feature-2.component.html'
    })
export class Feature2Component
{
    gridView=true; //To swithc between grid and list view
    products:Array<{name:string,id:string,price:number}>=[];

    constructor()
    {
        for(let i=0;i<40;i++)
        {
            this.products.push({name:`Product ${i+1}`,id:(i+""),price:(Math.round(Math.random()*100))});
        }
    }

    priceFilterChanged(event:any)
    {
        console.log({priceChanged:event});

        switch(event.target.value)
        {
            case "lTh": 
                this.products.sort((item1,item2)=>item1.price-item2.price);
            return;

            case 'hTl':
                this.products.sort((item1,item2)=>item2.price-item1.price);
        }
    }

}