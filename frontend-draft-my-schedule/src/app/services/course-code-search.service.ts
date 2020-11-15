import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseCodeSearchService {

  coursesURL: string = 'http://localhost:3000/api/courses/';

  constructor(private http:HttpClient) { }

  getCourseCodes(courseCodeInput:string):Observable<string[]>{
    console.log("get request for courses codes!")
    return this.http.get<string[]>(`${this.coursesURL}${courseCodeInput}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    window.alert(errorMessage +"Invalid Input or no course by that name!!!");
    return throwError(errorMessage);
  }
}
