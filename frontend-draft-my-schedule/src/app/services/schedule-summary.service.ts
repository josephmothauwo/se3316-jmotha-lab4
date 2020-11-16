import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleSummaryService {
  // schedulesURL: string = 'http://localhost:3000/api/all_schedules';
  schedulesURL: string = '/api/all_schedules';
  constructor(private http:HttpClient) { }

  getallSchedules():Observable<string[]>{
    console.log("get request for all schedules!")
    return this.http.get<string[]>(`${this.schedulesURL}`)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  deleteAllSchedules():Observable<any>{
    console.log("delete request for all schedules!")
    return this.http.delete(`${this.schedulesURL}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    window.alert(errorMessage + "Invalid Input!!!");
    return throwError(errorMessage);
  }

}
