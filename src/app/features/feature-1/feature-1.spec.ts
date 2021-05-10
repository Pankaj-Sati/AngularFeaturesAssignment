import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Feature1Component } from "./feature-1.component"
import { Feature1Module } from "./feature-1.module";

describe('Feature 1 Component',()=>
{
    let component:Feature1Component=null;
    let debugElement:DebugElement=null; //To query the elements and DOM on the component
    let componentFixture:ComponentFixture<Feature1Component>=null;
  
    beforeEach(waitForAsync(()=>
    {
        TestBed.configureTestingModule(
            {
                imports:[Feature1Module]
            }).compileComponents().then(()=>
            {
                componentFixture=TestBed.createComponent(Feature1Component); //Get the component fixture
                component=componentFixture.componentInstance; //Getting the component instance
                debugElement=componentFixture.debugElement;//Getting instance of Debug Element
            });
    }));

    it('should instantiate the component',()=>
    {
        expect(component).toBeTruthy('Component cannot be instantiated');
    })

    it('should display rotating text banner',()=>
    {
        const bannerReference=debugElement.query(By.css('#floatingBanner'));

        expect(bannerReference).toBeTruthy('Cannot get the reference to the Banner');

        expect(String(bannerReference.nativeElement.textContent).trim()).toBe('Floating Banner Text','Incorrect text displayed');
    })
})