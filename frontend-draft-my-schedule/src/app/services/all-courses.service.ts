import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { allCourse } from '../models/allCourse';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AllCoursesService {
  coursesURL: string = 'http://localhost:3000/api/all_courses';

  constructor(private http:HttpClient) { }

  getCourses():Observable<allCourse[]>{
    console.log("getcourses")
    return this.http.get<allCourse[]>(this.coursesURL)
  }

  
}
