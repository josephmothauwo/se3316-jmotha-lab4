import { Component, OnInit, Input } from '@angular/core';
import { ScheduleSummaryService } from 'src/app/services/schedule-summary.service';


@Component({
  selector: 'app-schedule-summary',
  templateUrl: './schedule-summary.component.html',
  styleUrls: ['./schedule-summary.component.css']
})
export class ScheduleSummaryComponent implements OnInit {
  @Input() schedule:string;
  scheduleSummary : string[]
  constructor(private ScheduleSummaryService:ScheduleSummaryService) { }

  ngOnInit(): void {
  }

  getAllSchedules(){
    this.ScheduleSummaryService.getallSchedules().subscribe(schedule => {
      this.scheduleSummary = schedule
    });
  }
  deleteAllSchedules(){
    this.ScheduleSummaryService.deleteAllSchedules().subscribe();
  }
}
