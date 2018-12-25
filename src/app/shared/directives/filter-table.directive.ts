import {Directive, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FilterService} from '../services/filter.service';
import {Subscription} from 'rxjs/Subscription';

@Directive({
    selector: '[filterable-table]'
})
export class FilterTableDirective implements OnInit, OnDestroy {

    constructor(private filterService: FilterService) {
    }

    @Output()
    filtred = new EventEmitter();

    private columnFiltredSubscription: Subscription;

    ngOnInit() {
        this.columnFiltredSubscription = this.filterService.columnFiltred$.subscribe(event => {
            this.filtred.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnFiltredSubscription.unsubscribe();
    }

}
