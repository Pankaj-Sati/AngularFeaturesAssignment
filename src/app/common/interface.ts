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
