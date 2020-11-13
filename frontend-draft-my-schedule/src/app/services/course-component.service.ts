import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { courseComponent } from '../models/courseComponent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseComponentService {

  courseComponentsURL: string = 'http://localhost:3000/api/courses/';

  constructor(private http:HttpClient) { }

  getCourseComponents(component:string):Observable<courseComponent[]>{
    console.log("get request for courses components!")
    return this.http.get<courseComponent[]>(`${this.courseComponentsURL}${component}`);
  }
}
