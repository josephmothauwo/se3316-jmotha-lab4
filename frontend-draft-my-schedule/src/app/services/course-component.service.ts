import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { courseComponent } from '../models/courseComponent';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseComponentService {

  courseComponentsURL: string = 'http://localhost:3000/api/courses/';

  constructor(private http:HttpClient) { }

  getCourseComponents(component:string):Observable<courseComponent[]>{
    console.log("get request for courses components!")
    return this.http.get<courseComponent[]>(`${this.courseComponentsURL}${component}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    window.alert(errorMessage +"Invalid input or course does not exist!!!");
    return throwError(errorMessage);
  }
}
