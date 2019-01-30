import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {SpinnerService} from './spinner/spinner.service';
import {DataNotAvailableComponent} from './tables/data-not-available/data-not-available.component';
import {FilterComponent} from './tables/filter/filter.component';
import {PaginationComponent} from './tables/pagination/pagination.component';
import {SearchComponent} from './tables/search/search.component';
import {AlertModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {BadgeComponent} from './badge/badge.component';
import {createTranslateLoader} from '../../app.translate.factory';
import {HttpClient} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        FormsModule,
        TranslateModule.forRoot(),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [
        PageNotFoundComponent,
        SpinnerComponent,
        DataNotAvailableComponent,
        FilterComponent,
        PaginationComponent,
        SearchComponent,
        BadgeComponent,
    ],
    declarations: [
        PageNotFoundComponent,
        SpinnerComponent,
        DataNotAvailableComponent,
        FilterComponent,
        PaginationComponent,
        SearchComponent,
        BadgeComponent,
    ],
    providers: [
        SpinnerService
    ]
})
export class ComponentsModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
