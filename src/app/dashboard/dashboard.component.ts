import { Component, OnInit } from '@angular/core';
import { DataService } from './../_services/data.service';
import { Observable } from 'rxjs';
import { Data } from '../_shared/data';
import { DatePipe } from '@angular/common';
import { MomentPipe } from '../_pipes/moment.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:    [ MomentPipe ]
})
export class DashboardComponent implements OnInit {

  data$: Observable<Data>;
  counts: number;
  today: Date;
  yesterday: Date;
  lastWeek: Date;

  todaySlug: string;
  yesterdaySlug: string;
  lastWeekSlug: string;

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    private moment : MomentPipe
  ) {

  }

  ngOnInit() {
    this.today = new Date();
    this.yesterday = new Date(this.today);
    this.lastWeek = new Date(this.today);

    this.yesterday.setDate(this.yesterday.getDate() - 1 );
    this.lastWeek.setDate(this.lastWeek.getDate() - 6 );

    this.todaySlug = this.moment.transform(this.todaySlug,'YYYY-MM-DD');
    this.yesterdaySlug = this.moment.transform(this.yesterday,'YYYY-MM-DD');
    this.lastWeekSlug = this.moment.transform(this.lastWeek,'YYYY-MM-DD');

    this.getTodayCounts();
  }

  getTodayCounts() {
    this.dataService.getDayPostsCounts( this.todaySlug ).subscribe(
      data => {
        this.counts = data.data;
      }
    );
  }

  getYesterdayCounts() {
    this.dataService.getDayPostsCounts(this.yesterdaySlug ).subscribe(
      data => {
        this.counts = data.data;
      }
    );
  }

  getLastWeekCounts() {
    this.dataService.getDaysPostsCounts( this.lastWeekSlug, this.todaySlug ).subscribe(
      data => {
        this.counts = data.data;
      }
    );
  }

}
