import { Component, OnInit } from '@angular/core';
import { allCourse } from 'src/app/models/allCourse';
import { AllCoursesService } from 'src/app/services/all-courses.service';

@Component({
  selector: 'app-all-courses-search',
  templateUrl: './all-courses-search.component.html',
  styleUrls: ['./all-courses-search.component.css']
})
export class AllCoursesSearchComponent implements OnInit {
  allCourses: allCourse[];
  constructor(private AllCoursesService:AllCoursesService) { }

  ngOnInit(): void {
    this.AllCoursesService.getCourses().subscribe(allCourses => {
      this.allCourses = allCourses
    }

    );
  }

}
