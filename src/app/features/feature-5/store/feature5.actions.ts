import { Action } from "@ngrx/store";
import { Student } from "src/app/common/interface";

export const SET_STUDENTS="[Students] Set Students";
export const SORT_STUDENTS="[Students] Sort Students";

export class SetStudents implements Action
{
    readonly type: string=SET_STUDENTS;

    constructor(public payload:Student[])
    {
    }
    
}

export class SortStudents implements Action
{
    readonly type=SORT_STUDENTS

    constructor(public column:string) //Payload will be the column name
    {
        
    }
}

//Lets write some type definations
export type StudentActionTypes=SetStudents | SortStudents;