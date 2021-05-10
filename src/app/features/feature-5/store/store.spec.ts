import {Store, StoreModule} from '@ngrx/store';

import * as fromStudent from './feature5.reducer';
import * as StuddentStoreActions from './feature5.actions';
import * as fromApp from '../main.reducer';
import { TestBed } from '@angular/core/testing';
import { Student } from 'src/app/common/interface';
import { pairwise, startWith, tap } from 'rxjs/operators';

describe('Feature 5 Store',()=>
{
    //Testing the NgRx store in isolation

    let storeRef:Store<fromApp.MainState>=null;
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

    beforeEach(()=>
    {
        TestBed.configureTestingModule(
            {
                imports:[StoreModule.forRoot(fromApp.mainReducer)],
                providers:[
                    {
                        provide:Store
                    }]
            });
       storeRef=TestBed.inject(Store);
    });

    it('should create an instance of store service',()=>
    {
        expect(storeRef).toBeTruthy('Failed to create an instance of the store service');
    });

    it('should return initial state of store without dispatching action',(done:DoneFn)=>
    {
        storeRef.subscribe(data=>{
            console.log('Received Store data',data);
            expect(data.studentList).toBeTruthy('Student List object is invalid');

            expect(data.studentList.students.length).toBe(0,'Students length was not 0');

            expect(data.studentList.lastSortOrder).toBeFalsy('Last sort order has a non-null value');

            expect(data.studentList.lastSortedColumn).toBeFalsy('Last sort column has a non-null value');

            done();
        })
    });

    it('should set the students store',(done:DoneFn)=> //Test case with expilict DoneFn callback-
    //- to tell that this test is completed
    {
        storeRef.dispatch(new StuddentStoreActions.SetStudents(demoStudents)); //Dispatch the action
        storeRef.subscribe(data=>
            {
                console.log(data);
                expect(data).toBeTruthy('No data received by the receivers');

                expect(data.studentList).toBeTruthy('Student list reducer invalid');

                expect(data.studentList.students.length).toBe(demoStudents.length,'Student list not set');
               
                expect(data.studentList.unSortedStudents.length).toBe(demoStudents.length,'Unsorted Student list not set');
                done();
            })
      
    });

    it('should sort the students store',(done:DoneFn)=> //Test case with expilict DoneFn callback-
    //- to tell that this test is completed
    {
      
        storeRef.dispatch(new StuddentStoreActions.SetStudents(demoStudents)); //Dispatch the action

        let numberOfEmissions=0;

        storeRef.pipe(
            tap(data=>
                {
                    console.log('Each Emission',data);
                    numberOfEmissions++;
                }),
            startWith({
                studentList:
                {
                    students:[],
                    unSortedStudents:[],
                    lastSortedColumn:null,
                    lastSortOrder:null
                }
            }),
            pairwise() //Emit from the second observable the previous and current values 
        ).subscribe(data=>
            {
                console.log(data);
                expect(data).toBeTruthy('No data received by the receivers');
              
                if(numberOfEmissions===2)
                {
                    //Sort by Name
                    expect(data[0].studentList.students[0].name).not.toBe(data[1].studentList.students[0].name,'Student list not sorted');
            
                }
                else if(numberOfEmissions===3)
                {
                    //Sort by sub1 in ascending
                    let student1=data[1].studentList.students[0];
                    let student2=data[1].studentList.students[2];
                    expect(student1.sub1).toBeLessThan(student2.sub1,'Student marks column not sorted');
                
                }
                else if(numberOfEmissions==4)
                {
                    //Sort by sub1 but in descending
                    let student1=data[1].studentList.students[0];
                    let student2=data[1].studentList.students[2];
                    expect(student1.sub1).toBeGreaterThan(student2.sub1,'Student marks column not sorted');
                    done();
                }

               
            });

            storeRef.dispatch(new StuddentStoreActions.SortStudents('name'));

            storeRef.dispatch(new StuddentStoreActions.SortStudents('sub1')); //Should sort in asc
            storeRef.dispatch(new StuddentStoreActions.SortStudents('sub1')); //Should sort in desc

      
    })

})