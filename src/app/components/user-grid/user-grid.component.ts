import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { map, scan } from "rxjs/operators"
import { BehaviorSubject, combineLatest, concat } from 'rxjs';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})

export class UserGridComponent implements OnInit {

  public userList: Array<{}> = [];
  public masterList: Array<{}> = [];
  constructor(public appService: AppService) { }

  ngOnInit(): void {

    this.appService.updateGrid$.
      subscribe((res) => {
        if (res) {
          this.userList = res;
          this.masterList = [...res];
        }
      })

    this.appService.sortedColumn$.pipe(
      scan<string, { col: string, dir: string }>((sort, val) => {
        return sort.col === val
          ? { col: val, dir: sort.dir === 'desc' ? 'asc' : 'desc' }
          : { col: val, dir: 'desc' }
      }, { dir: 'desc', col: '' })
    ).subscribe(res => {
      if (res) {
        this.appService.sortByColumn(this.userList, res.col, res.dir)
      }
    })


  }

  sortOn(column: string) {
    this.appService.sortedColumn$.next(column);
  }

  filterColum(event, fieldname){
    this.userList = this.appService.filterColumn(this.masterList,event.target.value.toLowerCase(), fieldname)
  }

}
