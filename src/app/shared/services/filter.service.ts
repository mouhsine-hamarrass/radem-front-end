import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';

@Injectable()
export class FilterService {

    constructor() {
    }

    private columnFiltredSource = new Subject<any>();

    columnFiltred$ = this.columnFiltredSource.asObservable();

    columnFiltred(event) {
        if (event.createdAt && event.createdAt !== '') {
            event.createdAt = moment(new Date(event.createdAt), 'DD\MM\YYYY').format('YYYY-MM-DD');
        }
        this.columnFiltredSource.next(event);
    }
}
