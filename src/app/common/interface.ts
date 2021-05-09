export class Events
{
    static readonly START='START';
    static readonly PAUSE='PAUSE';
    static readonly RESUME='RESUME';
    static readonly RESET='RESET';
}

export interface TimerEvent{
    event:string,
    payload?:number
}

export class TimerStates
{

    static readonly RUNNING='RUNNING';
    static readonly RESET='RESET';
    static readonly PAUSED='PAUSED';
}

export interface Student
{
    name:string;
    class:number;
    section:string;
    sub1:number;
    sub2:number;
    sub3:number;
}

export type SortOrder="ASC" | "DESC" | "NONE";
