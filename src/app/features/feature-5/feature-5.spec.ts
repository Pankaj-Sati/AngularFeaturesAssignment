import { ComponentFixture, flush, TestBed, waitForAsync } from "@angular/core/testing";
import { Feature5Component } from "./feature-5.component"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Feature5Module } from "./feature-5.module";
import { Store } from "@ngrx/store";
import { Student } from "src/app/common/interface";

describe('Feature 5',()=>
{
    let component:Feature5Component=null;
    let componentFixture:ComponentFixture<Feature5Component>=null;
    let httpTestingController:HttpTestingController=null;
    let storeRef:any=null; //Fake implementation of store

    let demoStudents:Student[]=[
        {
            "name": "Student 91",
            "class": 2,
            "section": "A",
            "sub1": 4,
            "sub2": 98,
            "sub3": 82
        },
        {
            "name": "Student 2",
            "class": 3,
            "section": "B",
            "sub1": 64,
            "sub2": 24,
            "sub3": 47
        },
        {
            "name": "Student 5",
            "class": 2,
            "section": "B",
            "sub1": 55,
            "sub2": 58,
            "sub3": 34
        },
        {
            "name": "Student 6",
            "class": 3,
            "section": "C",
            "sub1": 51,
            "sub2": 59,
            "sub3": 26
        }
    ];

    beforeEach(waitForAsync(()=>
    {
        storeRef=jasmine.createSpyObj('Store',['dispatch','select']);
        //Load the module
        TestBed.configureTestingModule({
            declarations:[Feature5Component],
            imports:[HttpClientTestingModule],
            providers:[
                {
                    provide:Store,
                    useValue:storeRef
                }]
        }).compileComponents().then(()=>
        {
            //Components compiled successfully
            componentFixture=TestBed.createComponent(Feature5Component);
            component=componentFixture.componentInstance;
            httpTestingController=TestBed.inject(HttpTestingController);
        });
    }));

    it('should create an instance of the Component',()=>
    {
        expect(component).toBeTruthy('Component not initialized');
    });

    it('should call student list api',()=>
    {
        component.getStudents();

        let req=httpTestingController.expectOne('assets/student.json');
        expect(req.request.method).toBe('GET','Called API with invalid method');

        req.flush({data:demoStudents});//Send the HTTP response

        httpTestingController.verify();

    })

})