import { Component, OnInit } from '@angular/core';
import { MakeScheduleService } from 'src/app/services/make-schedule.service';

@Component({
  selector: 'app-make-schedule',
  templateUrl: './make-schedule.component.html',
  styleUrls: ['./make-schedule.component.css']
})
export class MakeScheduleComponent implements OnInit {

  constructor(private MakeScheduleService:MakeScheduleService) { }

  ngOnInit(): void {
  }
  putScheduleName(name:string){
    this.MakeScheduleService.putScheduleName(name).subscribe(schedule => {
      console.log(schedule);
    });
  }

  deleteSchedule(deleteName:string){
    this.MakeScheduleService.deleteSchedule(deleteName).subscribe(schedule => {
      console.log(schedule);
    });
  }
}
