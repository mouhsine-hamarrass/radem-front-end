import { Component, OnInit, Input, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import {SortService} from '../../../services/sort.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: '[sortable-column]',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  constructor(private sortService: SortService) {}
  
  @Input('sortable-column')
  columnName: string;

  @Input('sort-direction')
  direction: string = 'ASC';

  private columnSortedSubscription: Subscription;

  @HostListener('click')
  sort() {
  
    this.direction = this.direction === 'ASC' ? 'DESC' : 'ASC';

    this.sortService.columnSorted({property: this.columnName, direction: this.direction});
  }

  ngOnInit() {
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.orders[0].property) { // the second incdicator
        this.direction = '';
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
