import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { Feature6Component } from "./feature-6.component"
import { Feature6Module } from "./feature-6.module";

fdescribe('Feature 6',()=>
{
    let componentFixture:ComponentFixture<Feature6Component>=null;
    let component:Feature6Component=null;
    let debugElement:DebugElement=null;

    beforeEach(waitForAsync(()=>
    {
        TestBed.configureTestingModule(
            {
                imports:[Feature6Module]
            }).compileComponents().then(()=>
            {
                componentFixture=TestBed.createComponent(Feature6Component);
                component=componentFixture.componentInstance;
                debugElement=componentFixture.debugElement;

                componentFixture.detectChanges();//Evaulate the bindings in the template
            });
    }))

    it('should create an instance of the component',()=>
    {
        expect(component).toBeTruthy('Falied to create component instance');
    })

    it('should load some divs initially',()=>
    {
        const productCards=debugElement.queryAll(By.css('.productsCard'));

        expect(productCards.length).toBeGreaterThan(10,'Product cards not displayed');
    });

    it('should display alert when clicked on button in a div',()=>
    {
        const productCards=debugElement.queryAll(By.css('.productsCard'));

        const productCard=productCards[9];

        const buttonInCard=productCard.query(By.css('button'));
        expect(buttonInCard).toBeTruthy('Button not found on the card');

        let alertSpy=spyOn(window,'alert');
        
        buttonInCard.triggerEventHandler('click',{});

        expect(alertSpy).toHaveBeenCalledWith(`Button 10 clicked`)
    });

})