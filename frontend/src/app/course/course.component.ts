import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { allCourse } from '../models/allCourse';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  
  allCourses: allCourse[];

  constructor() { }

  ngOnInit(): void {
    this.allCourses = [
    {
      subject: "BIO",
      className: "1234B"
    },
    {
      subject: "CHEM",
      className: "1236B"
    },
    {
      subject: "MATH",
      className: "4336A"
    }
    ]
  }


}
