import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
// import { newCourse } from 'src/app/models/newCourse';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AddCourseService {

  addCourseURL: string = 'http://localhost:3000/api/schedule/courses';
  constructor(private http:HttpClient) { }

  putCourse(subject:string, courseCode:string, scheduleName:string):Observable<any>{
    console.log("put request for adding a course!")
    const body= {
      scheduleName: scheduleName.toLocaleUpperCase(),
      subjectNames: subject.toLocaleUpperCase(),
      courseNumbers: courseCode.toLocaleUpperCase()
    };
    return this.http.put(`${this.addCourseURL}`,body,httpOptions);
  }
}
