import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseCodeSearchService {

  coursesURL: string = 'http://localhost:3000/api/courses/';

  constructor(private http:HttpClient) { }

  getCourseCodes(courseCodeInput:string):Observable<string[]>{
    console.log("get request for courses codes!")
    return this.http.get<string[]>(`${this.coursesURL}${courseCodeInput}`);
  }
}
