import {Component, OnInit, Input} from '@angular/core';
import {FilterService} from '../../../services/filter.service';
import {Statut} from '../../../models/user.model';
import * as moment from 'moment';
import * as _ from 'underscore';
import {environment} from '../../../../../environments/environment';
import {ColumnFiltersModel} from '../../../models/columnFilteredEvent.model';

@Component({
    selector: '[filterable-column]',
    templateUrl: './filter-column.component.html',
    styleUrls: ['./filter-column.component.scss']
})
export class FilterColumnComponent implements OnInit {
    today: Date = new Date();
    filter = new ColumnFiltersModel();
    statusTypes = Statut;

    @Input('filterable-column')
    columnName: string;

    @Input('filter-type')
    filtertype: string;

    @Input('filter-disabled')
    filterDisabled: boolean = false;

    @Input('filter-select-data')
    filterData: any;

    @Input('filter-select-data-key')
    filterDataKey: string;

    @Input('filter-select-data-value')
    filterDataValue: string;

    @Input('filter-select-default-value')
    filterDefaultValue: string = null;

    @Input('filter-placeholder')
    filterPlaceholder: string;

    constructor(private filterService: FilterService) {
    }


    dateChanged(columnName, inputValue): void {
        if (inputValue) {
            const input = document.querySelector('.ms-input#' + columnName);
            const dateConversion = moment(new Date(inputValue)).format(environment.defaultDateFormatNoTime);
            this.filter[columnName] = dateConversion;
            this.search();
            if (input) {
                setTimeout(() => {
                    input['value'] = dateConversion;
                }, 100);
            }
        }
    }

    search() {
        this.initValues();
        this.filterService.columnFiltred(this.filter);
    }

    ngOnInit() {
    }

    initValues() {
        for (const key in this.filter) {
            const input = document.querySelector('.ms-input#' + key);
            if (input && input['value']) {
                // in the case of no fitler is selected instead of null object it return a string with the value of 'null'
                this.filter[key] = input['value'] === 'null' ? null : input['value'];
            }
        }
    }

    emptyFilter(columnName) {
        this.filter[columnName] = '';
        const input = document.querySelector('.ms-input#' + columnName);
        if (input && input['value']) {
            input['value'] = this.filter[columnName];
            this.search();
        }
    }
}
