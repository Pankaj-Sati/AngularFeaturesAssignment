
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { SharedModule } from "./shared.module";
import { UpperCasePipe } from "./upperCase.pipe";

describe('Upper Case Custom pipe',()=>
{
    let upperCasePipe:UpperCasePipe=null;
    beforeEach(waitForAsync(()=>
    {
        TestBed.configureTestingModule(
            {
                providers:[UpperCasePipe] //Using the Constructor function as Token 
            });
            upperCasePipe=TestBed.inject(UpperCasePipe); //Getting the refrence by passing the Token
      
    }));

    it('should initialize correctly',()=>
    {
        expect(upperCasePipe).toBeTruthy('Instance cannot be created');
    })

    it('should return non-string unmodified',()=>
    {
        const value=902;
        const afterTransform=upperCasePipe.transform(value);

        expect(value).not.toBeInstanceOf(String);
    })

    it('should return string with upper case of each word ',()=>
    {
        const value="this is a demo string      . with long poses";
        const afterTransform=upperCasePipe.transform(value);

        expect(afterTransform.charAt(5)).toBe('I');
    })

})