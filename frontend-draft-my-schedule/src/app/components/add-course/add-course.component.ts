import { Component, OnInit } from '@angular/core';
import { AddCourseService } from 'src/app/services/add-course.service';




@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private AddCourseService:AddCourseService) { }

  ngOnInit(): void {
  }

  putCourse(subject:string, courseCode:string, scheduleName:string){
  
    this.AddCourseService.putCourse(subject, courseCode, scheduleName).subscribe(newCourse=> {
      console.log(newCourse)
    });
  }

}
