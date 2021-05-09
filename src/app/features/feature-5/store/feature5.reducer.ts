import { SortOrder, Student } from "src/app/common/interface";
import * as StudentStoreActions from './feature5.actions';

export interface State
{
    //For defining the structure of this store
    students:Student[],
    unSortedStudents:Student[],
    lastSortedColumn:string, //For storing the name of the last sorted column
    lastSortOrder:SortOrder //For storing the last sort order
}

const initialState:State= //Initial State of our Store
{
    students:[],
    unSortedStudents:[],
    lastSortedColumn:null,
    lastSortOrder:null

}

export function studentReducer(state=initialState,action:StudentStoreActions.StudentActionTypes)
{
    //Reducer is a function that takes in current state and action to be performed on it

    switch(action.type)
    {
        case StudentStoreActions.SET_STUDENTS:
            return {
                ...state, //Copy the current state so that we don't mutate the original data
                students:[...action.payload], //Modify a certain property of the state
                unSortedStudents:[...action.payload], //Preserving the original unsorted list
                lastSortedColumn:null,
                lastSortOrder:null
            }
        
        case StudentStoreActions.SORT_STUDENTS:
            //This action will sort students list accoring to the previously saved state
            
            let newState:State=
            {
                ...state, //Copy the current state
                students:[...state.students]
            }
            const act:StudentStoreActions.SortStudents=<StudentStoreActions.SortStudents>action;
            let sortedColums=[];

            if(act.column===state.lastSortedColumn)
            {
                //If the same column is to be sorted, we will check previous sort order

                if(state.lastSortOrder==null || state.lastSortOrder==="NONE")
                {
                    //Previous None,, sort in Ascending
                    sortedColums=newState.students.sort((s1,s2)=>{
                        return sortAscending(s1,s2,act.column)
                    })
                    newState.lastSortOrder="ASC";
                }
                else if(state.lastSortOrder==="ASC")
                {
                    //Previous Ascending, Sort in descending
                    sortedColums=newState.students.sort((s1,s2)=>{
                        return sortDescending(s1,s2,act.column)
                    })
                    newState.lastSortOrder="DESC";
                }
                else
                {
                    //Previous Descending, sort in original order
                    sortedColums=[...state.unSortedStudents]; //Return the unmodified state
                    newState.lastSortOrder="NONE";
                }
            }
            else
            {
                //A new column is to be sorted, so we will sort it in ascending order
                sortedColums=newState.students.sort((s1,s2)=>{
                    return sortAscending(s1,s2,act.column)
                })
                newState.lastSortOrder="ASC";
                newState.lastSortedColumn=act.column;
            }

            newState.students=[...sortedColums];
            return newState;

        default:
            //We should always return the current state so that it is not lost in any case-
            //- because, any action will trigger all the reducers
            return state; 
    }

}

function sortAscending(s1:Student,s2:Student,columnName:string)
{
        if(typeof s1[columnName] == "string" || s1[columnName] instanceof String)
        {
            return String(s1[columnName]).localeCompare(s2[columnName],"en",{numeric:true}); 
        }
        else
        {
            //A number
            return s1[columnName]-s2[columnName]; //Ascending order if s1[col] is less than s2[col]
        }           
}

function sortDescending(s1:Student,s2:Student,columnName:string)
{
        if(typeof s1[columnName] == "string" || s1[columnName] instanceof String)
        {
            return String(s2[columnName]).localeCompare(s1[columnName],"en",{numeric:true}); 
        }
        else
        {
            //A number
            return s2[columnName]-s1[columnName]; //Desscending order if s2[col] is greater than s1[col]
        }           
}