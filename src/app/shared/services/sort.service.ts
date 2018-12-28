import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ColumnSortedEventModel} from '../models/columnSortedEvent.model';

@Injectable()
export class SortService {

  sortOutput: Array<ColumnSortedEventModel>;

  constructor() {
  }

  private columnSortedSource = new Subject<any>();

  columnSorted$ = this.columnSortedSource.asObservable();

  columnSorted(event: ColumnSortedEventModel) {
    this.sortOutput = [
      {
        ignoreCase: true,
        direction: 'DESC',
        property: 'lastModifiedDate'
      },
      {
        ignoreCase: true,
        direction: 'DESC',
        property: 'createdDate'
      }
    ];
    event.ignoreCase = true;
    this.sortOutput.unshift(event);

    this.columnSortedSource.next({
      orders: this.sortOutput
    });
  }

}
