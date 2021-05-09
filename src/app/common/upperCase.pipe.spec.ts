
import { TestBed } from "@angular/core/testing";
import { UpperCasePipe } from "./upperCase.pipe";

describe('Upper Case Custom pipe',()=>
{
    let upperCasePipe:UpperCasePipe=null;

    beforeEach(()=>
    {
        TestBed.configureTestingModule(
            {
                declarations:[UpperCasePipe] //Using the Constructor function as Token 
            });
        upperCasePipe=TestBed.inject(UpperCasePipe); //Getting the refrence by passing the Token
    });

    it('should initialize correctly',()=>
    {
        expect(upperCasePipe).toBeTruthy('Instance cannot be created');
    })

})