import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USER_INFO } from '../constant/app.constant';
import { IUser } from '../interface/user.interface';

@Injectable({ providedIn: 'root' })
export class AppService {

  public updateGrid$ = new BehaviorSubject<IUser[]>(USER_INFO);
  public sortedColumn$ = new BehaviorSubject<string>('');
  public userList = USER_INFO;
  constructor() { }

  public addUsers(userInfo: IUser) {
    if (this.checkForDuplicateValues(userInfo)) {
      return;
    }
    this.userList.push(userInfo);
    this.updateGrid$.next(this.userList)
  }

  public checkForDuplicateValues(userInfo: IUser) {
    const checkDuplicatValues = this.userList.find((item: any) => {
      return item.email === userInfo.email;
    })
    return checkDuplicatValues;
  }

  public sortByColumn(list: IUser[] | undefined, column: string, direction = 'desc'): any[] {
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

  public filterColumn(list: IUser[], value: string, fieldname: string) {
    const filterData = list.filter((item) => item[fieldname].toLowerCase().includes(value));
    return filterData;
  }

}