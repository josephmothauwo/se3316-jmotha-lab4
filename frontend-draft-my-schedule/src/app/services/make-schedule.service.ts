import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


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
    console.log("put request for schedule");
    return this.http.put(`${this.scheduleNameURL}${name}`,null, httpOptions);
  }
}
