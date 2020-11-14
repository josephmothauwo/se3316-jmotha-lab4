import { Component, OnInit, Input } from '@angular/core';
import { GetOneScheduleService } from 'src/app/services/get-one-schedule.service';


@Component({
  selector: 'app-get-one-schedule',
  templateUrl: './get-one-schedule.component.html',
  styleUrls: ['./get-one-schedule.component.css']
})
export class GetOneScheduleComponent implements OnInit {
  @Input() schedule:string;
  recievedSchedule : string[]
  constructor(private GetOneScheduleService:GetOneScheduleService) { }

  ngOnInit(): void {
  }

  getOneSchedule(schedule:string){
    this.GetOneScheduleService.getOneSchedule(schedule.toLocaleUpperCase()).subscribe(schedule => {
      this.recievedSchedule = schedule
    });
  }
}
