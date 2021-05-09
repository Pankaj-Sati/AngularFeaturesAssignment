import { Observable, throwError } from "rxjs";

export function handleHttpError(error):Observable<any>
{
    console.log(error.error);
    return throwError(error);
}