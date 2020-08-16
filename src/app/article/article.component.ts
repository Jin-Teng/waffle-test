import { TokenStorageService } from './../_services/token-storage.service';
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../_services/data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Data } from '../_shared/data';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentPipe } from '../_pipes/moment.pipe';

// export const PICK_FORMATS = {
//   parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
//   display: {
//       dateInput: 'input',
//       monthYearLabel: {year: 'numeric', month: 'short'},
//       dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//       monthYearA11yLabel: {year: 'numeric', month: 'long'}
//   }
// };

// export class PickDateAdapter extends NativeDateAdapter {
//   format(date: Date, displayFormat: Object): string {
//       if (displayFormat === 'input') {
//           return formatDate(date,'yyyy/MM/dd',this.locale);;
//       } else {
//           return date.toDateString();
//       }
//   }
// }

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [
    // {provide: DateAdapter, useClass: PickDateAdapter},
    // {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
    MomentPipe
  ]
})
export class ArticleComponent implements OnInit {
  items: Post[];
  items$: Observable<Data>;
  posts$: Observable<Post[]>;
  role: string;

  inputText: string;
  inputDate: string;

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    private tokenStorageService: TokenStorageService,
    private moment : MomentPipe
  ) {

  }

  ngOnInit() {
    this.getPosts();
    this.role = this.tokenStorageService.getUser();
  }


  getPosts() {
    this.dataService.getPosts().subscribe(
      data => {
        this.items = data.data;
      }
    );
  }

  /**
   * inputText is two-way biding
   * search posts by inputText
   */
  searchText(){
    this.posts$ = this.dataService.getPosts().pipe(
      map( data => data.data as Post[] ),
      map( data => data.filter( data => data.name.indexOf(this.inputText) >= 0 ))
    );
    this.posts$.subscribe(
      data => this.items = data
    );
  }

  /**
   * inputDate is two-way biding
   * filter posts by inputDate
   */
  filterDate() {
    // this.inputDate = this.datePipe.transform(this.inputDate, 'yyyy-MM-dd');
    this.inputDate = this.moment.transform(this.inputDate,'YYYY-MM-DD');
    this.posts$ = this.dataService.getPosts().pipe(
      map( data => data.data as Post[] ),
      map( data => data.filter(
          // data => this.datePipe.transform(data.create_at, 'yyyy-MM-dd').toString() === this.inputDate
          data => this.moment.transform(data.create_at, 'YYYY-MM-DD') === this.inputDate
        )
      )
    );
    this.posts$.subscribe(
      data => this.items = data
    );

  }
}

export interface Post{
  name: string;
  author: string;
  create_at: Date;
}

