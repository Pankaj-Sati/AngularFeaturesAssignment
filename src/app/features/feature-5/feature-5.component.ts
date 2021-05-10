import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, tap } from "rxjs/operators";
import { SortOrder, Student } from "src/app/common/interface";

import * as Utils from '../../common/utils';
import * as fromMain from './main.reducer';
import * as StudentStoreActions from './store/feature5.actions';
import { State } from "./store/feature5.reducer";

@Component(
    {
        selector:'feature-5',
        styleUrls:['./feature-5.component.scss'],
        templateUrl:'./feature-5.component.html'
    })
export class Feature5Component implements OnInit
{
    students:Student[]=[];
    currentSortedColumn:string=null;
    currentSortOrder:SortOrder=null;

    constructor(private httpClient:HttpClient,
        private store:Store<fromMain.MainState>){
        
    }
    ngOnInit() 
    {
        console.log('In ngOnInit()');
      this.getStudents();
      
      this.store.select('studentList').pipe(
          tap(console.log),
      ).subscribe((data:State)=>
          {
              this.students=data.students;
              this.currentSortOrder=data.lastSortOrder;
              this.currentSortedColumn=data.lastSortedColumn;
          })
      
    }

    getStudents()
    {
        this.httpClient.get('assets/student.json').pipe(
            catchError(Utils.handleHttpError),
            map(data=>data['data']) //Map the emitted value to an observable
        )
        .subscribe((data:Student[])=>
            {
                console.log(data);
                this.store.dispatch(new StudentStoreActions.SetStudents(data)); //Dispatch the action-
                //- to the Students store
            });
    }

    getkeysIn(item)
    {
        if(!item || !(item instanceof Object))
        {
            return [];
        }
        return Object.keys(item);
    }

    sortHeading(columnName:string)
    {
        this.store.dispatch(new StudentStoreActions.SortStudents(columnName));
    }

    getSortOrder(columnName:string):string
    {
        if(columnName===this.currentSortedColumn)
        {
            if(this.currentSortOrder==="ASC")
            {
                return "⬇";
            }
            else if(this.currentSortOrder=="DESC")
            {
                return "⬆";
            }
        }
        
        return "↕";
    }

}