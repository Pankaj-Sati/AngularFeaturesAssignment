import { ActionReducerMap } from "@ngrx/store";
import * as fromStudents from './store/feature5.reducer';

export interface MainState
{
    //This interface will define types of reducers availble in our module
    studentList:fromStudents.State
}

export const mainReducer:ActionReducerMap<MainState>=
{
    studentList:fromStudents.studentReducer
}