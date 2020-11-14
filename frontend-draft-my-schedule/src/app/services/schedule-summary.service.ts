import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScheduleSummaryService {
  schedulesURL: string = 'http://localhost:3000/api/all_schedules';
  constructor(private http:HttpClient) { }

  getallSchedules():Observable<string[]>{
    console.log("get request for all schedules!")
    return this.http.get<string[]>(`${this.schedulesURL}`);
  }

}
