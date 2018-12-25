import {Directive, EventEmitter, OnDestroy, OnInit, Output, Input} from '@angular/core';
import {SortService} from '../services/sort.service';
import {Subscription} from 'rxjs/Subscription';

@Directive({
    selector: '[sortable-table]'
})
export class SortTableDirective implements OnInit, OnDestroy {

    constructor(private sortService: SortService) {
    }

    @Output()
    sorted = new EventEmitter();

    private columnSortedSubscription: Subscription;

    ngOnInit() {
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {

            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}

