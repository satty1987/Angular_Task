import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USER_INFO } from '../constant/app.constant';

@Injectable({ providedIn: 'root' })
export class AppService {

  public updateGrid$ = new BehaviorSubject(USER_INFO);
  public sortedColumn$ = new BehaviorSubject<string>('');
  public userList = USER_INFO;
  constructor() { }

  addUsers(userInfo) {
    if (this.checkForDuplicateValues(userInfo)) {
      return;
    }
    this.userList.push(userInfo);
    this.updateGrid$.next(this.userList)
  }

  checkForDuplicateValues(userInfo) {
    const checkDuplicatValues = this.userList.find((item: any) => {
      return item.email === userInfo.email;
    })
    return checkDuplicatValues;
  }

  sortByColumn(list: any[] | undefined, column: string, direction = 'desc'): any[] {
    let sortedArray = (list || []).sort((a, b) => {
      if (a[column] > b[column]) {
        return (direction === 'desc') ? 1 : -1;
      }
      if (a[column] < b[column]) {
        return (direction === 'desc') ? -1 : 1;
      }
      return 0;
    })
    return sortedArray;
  }

  filterColum(list, value, fieldname) {
    const filterData = list.filter((item) => item[fieldname].toLowerCase().includes(value));
    return filterData;
  }

}