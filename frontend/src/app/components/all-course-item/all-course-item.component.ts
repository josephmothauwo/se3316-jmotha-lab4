import { Component, OnInit,Input } from '@angular/core';
import {allCourse} from 'src/app/models/allCourse'

@Component({
  selector: 'app-all-course-item',
  templateUrl: './all-course-item.component.html',
  styleUrls: ['./all-course-item.component.css']
})
export class AllCourseItemComponent implements OnInit {  
  constructor() { }
  @Input() course: allCourse;
  ngOnInit(): void {
  }

}
