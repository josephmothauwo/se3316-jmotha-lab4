import { Component, OnInit, Input } from '@angular/core';
import { courseComponent } from 'src/app/models/courseComponent';
import { CourseComponentService } from 'src/app/services/course-component.service';

@Component({
  selector: 'app-component-search',
  templateUrl: './component-search.component.html',
  styleUrls: ['./component-search.component.css']
})
export class ComponentSearchComponent implements OnInit {
  @Input() courseComponent:courseComponent;
  allCourseComponents: courseComponent[];
  constructor(private CourseComponentService:CourseComponentService) { }
  

  ngOnInit(): void {
  }

  getCourseComponents(subject:string, courseCode:string, component:string){
    var concat = `${subject.toLocaleUpperCase()}/${courseCode.toLocaleUpperCase()}/${component.toLocaleUpperCase()}`
    this.CourseComponentService.getCourseComponents(concat).subscribe(allCourseComponents=> {
      this.allCourseComponents = allCourseComponents
    });
  }

}
