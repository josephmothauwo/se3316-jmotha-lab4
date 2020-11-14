import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetOneScheduleService {

  constructor(private http:HttpClient) { }
  scheduleURL: string = 'http://localhost:3000/api/schedules/';

  getOneSchedule(scheduleName:string):Observable<string[]>{
    console.log("get request for courses codes!")
    return this.http.get<string[]>(`${this.scheduleURL}${scheduleName}`);
  }
}
