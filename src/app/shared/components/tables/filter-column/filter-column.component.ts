import {AdminService} from './../../../../main/services/admin.service';
import {Component, OnInit, Input} from '@angular/core';
import {FilterService} from '../../../services/filter.service';
import {Statut, UnitTypeEnum} from '../../../models/user.model';
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
    listProfils: any = [];
    unitType = UnitTypeEnum;
    functionsList: any;

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

    @Input('filter-select-data-key-alias')
    filterDataKeyAlias: string;

    @Input('filter-select-data-value')
    filterDataValue: string;

    @Input('filter-select-default-value')
    filterDefaultValue: string = null;

    @Input('filter-placeholder')
    filterPlaceholder: string;

    @Input('filter-status-for')
    filterStatusFor: string = 'default';
    keyword: any;

    constructor(private filterService: FilterService, private adminService: AdminService) {

    }

    statusList(): Array<string> {
        const statusList = Object.keys(this.statusTypes);
        if (this.filterStatusFor !== 'default') {
            return _.difference(statusList, _.without(statusList, 'CANCELED', 'PUBLISHED'));
        } else { // For publication status
            return _.difference(statusList, _.without(statusList, 'CANCELED', 'DELETED', 'DRAFT', 'IN_MODERATION',
                'PUBLISHED', 'RECYCLED', 'REJECTED', 'TO_BE_MODERATED', 'TO_BE_PUBLISHED'));
        }
    }

    getProfiles(): void {
        this.adminService.getListProfiles().subscribe((response) => {
            if (response && response.data) {
                this.listProfils = response.data;
            }
        }, (err) => {
        });
    }

    unitTypeList(): Array<string> {
        const unitList = Object.keys(this.unitType);
        return unitList;
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
        /*
        if (this.filtertype === 'profile') {
            this.getProfiles();
        }
        if (this.filtertype === 'parent') {
            this.getFunctionList();
        }
        */
    }

    initValues() {
        for (const key in this.filter) {
            const input = document.querySelector('.ms-input#' + key);
            if (input && input['value']) {
                this.filter[key] = input['value'];
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

    getFunctionList(): void {
        /*
        this.adminService.getlistAllFunctions().subscribe(
            resp => {
                this.functionsList = resp.data;
                _.each(this.functionsList, (element: any) => {
                    _.extend(element, {itemName: element.title});
                });
            },
            err => {
            }
        );
        */
    }
}
