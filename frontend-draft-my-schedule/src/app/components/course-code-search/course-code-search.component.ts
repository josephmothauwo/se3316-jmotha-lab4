import { Component, Input, OnInit } from '@angular/core';
import { CourseCodeSearchService } from 'src/app/services/course-code-search.service';
@Component({
  selector: 'app-course-code-search',
  templateUrl: './course-code-search.component.html',
  styleUrls: ['./course-code-search.component.css']
})
export class CourseCodeSearchComponent implements OnInit {
  @Input() courseCode:string;
  courseCodes:string[];
  constructor(private CourseCodeSearchService:CourseCodeSearchService) { }
  
  ngOnInit(): void {
  }

  getCourseCodes(subject:string){
    this.CourseCodeSearchService.getCourseCodes(subject).subscribe(allCourseCodes => {
      this.courseCodes = allCourseCodes
    });
  }

}
