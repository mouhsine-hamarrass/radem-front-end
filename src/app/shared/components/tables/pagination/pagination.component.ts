import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    currentPage: number;
    @Input() totalItems: number;
    @Input() numberOfItems: number;
    @Input() totalPages: number;
    @Input() maxSize: number;
    @Input() align: boolean;
    @Input() pageBtnClass: string;
    @Input() itemsPerPage: number;
    @Input() showPagination = false;

    @Output() onpageChanged: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.onpageChanged.emit(event.page);
    }

    ngOnInit() {
    }
}
