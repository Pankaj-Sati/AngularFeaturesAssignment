import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Feature2Component } from "./feature-2.component"
import { Feature2Module } from "./feature-2.module";

describe('Feature 2',()=>
{
    let component:Feature2Component=null; //Acutal reference to the component
    let debugElement:DebugElement=null; //Utility for debugging UI elements of the component
    let componentFixture:ComponentFixture<Feature2Component>=null; //Has methods for unit testing the component

    beforeEach(waitForAsync(()=>{
        TestBed.configureTestingModule(
            {
                imports:[Feature2Module] //Since this module isn't dependent on service or other module-
                //-we will directly import it
            }).compileComponents().then(()=>//Runs the Angular Complier on the componets and modules
            {
                componentFixture=TestBed.createComponent(Feature2Component);
                component=componentFixture.componentInstance;
                debugElement=componentFixture.debugElement;
            })
    }));

    it('should create an instance of Feature 2 component',()=>
    {
        expect(component).toBeTruthy('Failed to create component instance');
    })

    it('should have grid/list buttons',()=>
    {
        const buttonsContainer=debugElement.query(By.css('.viewButtons'));

        expect(buttonsContainer).toBeTruthy('Buttons container not available on DOM');

        const buttons=buttonsContainer.queryAll(By.css('button')); //Get all buttons inside buttons container
        expect(buttons.length).toBe(2,'Buttons length is not correct');

        expect(buttons[0].nativeElement.textContent).toContain('Grid','Grid button not displayed');
    })

    it('should have product cards',()=>
    {
        componentFixture.detectChanges(); //Manually we need to run the change detection cycle to update the bindings
        const productCardsOnUI=debugElement.queryAll(By.css('.productsCard'));

        const productsFetched=component.products;

        expect(productCardsOnUI.length).toBe(productsFetched.length,'Incorrect number of cards displayed');
    });

    it('should display list view when clicked on List View button',()=>
    {
        componentFixture.detectChanges(); //Manually we need to run the change detection cycle to update the bindings

        const viewButtons=debugElement.query(By.css('.viewButtons'));
        const gridViewButton=viewButtons.queryAll(By.css('button'))[0];
        const listViewButton=viewButtons.queryAll(By.css('button'))[1];

        listViewButton.nativeElement.click(); //perform the click

        componentFixture.detectChanges(); //Run the change detection cycle 

        //Should mark the button selected
        expect(listViewButton.nativeElement.classList).toContain('selected');

        const productsContainer=debugElement.query(By.css('.productsContainer'));

        expect(productsContainer).toBeTruthy('Products Container element not found');

        expect(productsContainer.nativeElement).not.toHaveClass("useGrid",'Grid view class still found on list view');


        //Clicking back on Grid View, it should add grid view class to the container

        gridViewButton.nativeElement.click();

        componentFixture.detectChanges();

        expect(productsContainer.nativeElement).toHaveClass('useGrid','Grid view class not found after clicking grid view');
    });

    it('should sort the products when clicked on price filters',fakeAsync(()=>
    {   
        componentFixture.detectChanges();
        const priceFilter=debugElement.query(By.css('.filtersContainer')).query(By.css('select'));

        expect(priceFilter).toBeTruthy('Price filter dropdown not displayed');

        const productsContainer=debugElement.query(By.css('.productsContainer'));
        const firstCardWithoutSorting=productsContainer.queryAll(By.css('.productsCard'))[0];

        expect(firstCardWithoutSorting).toBeTruthy('First Card not displayed');

        //Now, lets update the select value

        const lowToHightOption=priceFilter.query(By.css("option[value='lTh']"));
        expect(lowToHightOption).toBeTruthy('No Low To High option available');

        lowToHightOption.nativeElement.selected=true;
        priceFilter.triggerEventHandler('change',{target:
            {
                value:'lTh'
            }}); //Since we are updating the products list when this event triggers, so we will have to manually,
            //-trigger the event on the DOM

        componentFixture.detectChanges(); //Run the change detection cycle

        flush();
   
        expect(priceFilter.nativeElement.value).toBe('lTh','Price filter not updated');
        const firstCardAfter=productsContainer.queryAll(By.css('.productsCard'))[0];
        const secondCardAfter=productsContainer.queryAll(By.css('.productsCard'))[1];

        //Lets check if the card updated
        const sortedProducts=[...component.products].sort((item1,item2)=>item1.price-item2.price);
        expect(firstCardAfter.query(By.css('strong')).nativeElement.textContent).toBe(sortedProducts[0].name,'Invalid card after sorting');
        
    }))
})