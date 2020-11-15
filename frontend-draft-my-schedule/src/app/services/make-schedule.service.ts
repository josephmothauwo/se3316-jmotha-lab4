import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MakeScheduleService {
  scheduleNameURL: string = 'http://localhost:3000/api/schedules/';
  constructor(private http:HttpClient) { }

  putScheduleName(name:string):Observable<any>{
    console.log("put request for schedule",name);
    return this.http.put(`${this.scheduleNameURL}${name}`,null, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  deleteSchedule(deleteName:string):Observable<any>{
    console.log("put request for schedule");
    return this.http.delete(`${this.scheduleNameURL}${deleteName}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    window.alert(errorMessage + "Invalid Input!!!")
    return throwError(errorMessage);
  }
}
