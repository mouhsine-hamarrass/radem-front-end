import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {SpinnerService} from './spinner/spinner.service';
import {DataNotAvailableComponent} from './tables/data-not-available/data-not-available.component';
import {FilterComponent} from './tables/filter/filter.component';
import {PaginationComponent} from './tables/pagination/pagination.component';
import {SearchComponent} from './tables/search/search.component';
import {AlertModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    TranslateModule.forRoot(),
  ],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
    DataNotAvailableComponent,
    FilterComponent,
    PaginationComponent,
    SearchComponent
  ],
  declarations: [
    PageNotFoundComponent,
    SpinnerComponent,
    DataNotAvailableComponent,
    FilterComponent,
    PaginationComponent,
    SearchComponent,
  ],
  providers: [
    SpinnerService
  ]
})
export class ComponentsModule { }
