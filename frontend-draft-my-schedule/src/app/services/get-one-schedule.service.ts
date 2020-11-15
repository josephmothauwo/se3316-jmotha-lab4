import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetOneScheduleService {

  constructor(private http:HttpClient) { }
  scheduleURL: string = 'http://localhost:3000/api/schedules/';

  getOneSchedule(scheduleName:string):Observable<string[]>{
    console.log("get request for courses codes!")
    return this.http.get<string[]>(`${this.scheduleURL}${scheduleName}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    window.alert(errorMessage+"Invalid Input or Schedule does not exist or it is empty");
    return throwError(errorMessage);
  }
}
