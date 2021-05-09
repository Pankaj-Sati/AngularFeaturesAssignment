import { Pipe, PipeTransform } from "@angular/core";

@Pipe(
    {
        name:'upprCase'
    })
export class UpperCasePipe implements PipeTransform
{
    transform(value: any, ...args: any[]) 
    {
        if((value instanceof String || typeof value ==="string") && value.length>0)
        {
            let words=value.split(" ").filter(val=>val.length>0);
           
            words=words.map(val=>{
                return val[0].toUpperCase()+val.substring(1);
            });
           
            return words.join(" ");
        }
        //Not a string value
        return value;//Return value unchanged
    }

}