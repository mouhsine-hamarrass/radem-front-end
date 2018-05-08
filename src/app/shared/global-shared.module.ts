import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {TranslateModule} from '@ngx-translate/core';
import {
  AccordionModule,
  AlertModule,
  BsDatepickerModule,
  BsDropdownModule,
  ButtonsModule,
  CarouselModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  SortableModule,
  TabsModule,
  TooltipModule,
  CollapseModule
} from 'ngx-bootstrap';

import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {MentionModule} from 'angular-mentions/mention';
import {ClipboardModule} from 'ngx-clipboard';
import {MomentModule} from 'angular2-moment';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {SpinnerService} from './components/spinner/spinner.service';
import {TruncatePipe} from './pipes/truncate.pipe';
import {PrintService} from './services/print.service';
import {HighlightPipe} from './pipes/highlight.pipe';
import {SortPipe} from './pipes/sort.pipe';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './services/data.service';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {CalendarModule} from 'angular-calendar';
import {ToastrModule} from 'ngx-toastr';
import {ChecklistModule} from 'angular-checklist';
import {TagInputModule} from 'ngx-chips';
import {NgxToggleModule} from 'ngx-toggle';
import { BytesToSizePipe } from './pipes/bytes-to-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule,
    MentionModule,
    ClipboardModule,
    MomentModule,
    FormlyBootstrapModule,
    RouterModule,
    TranslateModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    SortableModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CalendarModule.forRoot(),
    ToastrModule.forRoot(),
    ChecklistModule,
    TagInputModule,
    NgxToggleModule
  ],
  declarations: [
    LoginComponent,
    SpinnerComponent,
    TruncatePipe,
    HighlightPipe,
    SortPipe,
    BytesToSizePipe
  ],
  providers: [
    SpinnerService,
    PrintService,
    DataService
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    FormlyModule,
    MentionModule,
    ClipboardModule,
    FormlyBootstrapModule,
    RouterModule,
    TranslateModule,
    ModalModule,
    AlertModule,
    AccordionModule,
    CarouselModule,
    BsDropdownModule,
    AngularMultiSelectModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule,
    PaginationModule,
    ButtonsModule,
    TabsModule,
    SortableModule,
    TooltipModule,
    PopoverModule,
    CollapseModule,
    BsDatepickerModule,
    LoginComponent,
    SweetAlert2Module,
    SpinnerComponent,
    TruncatePipe,
    HighlightPipe,
    SortPipe,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CalendarModule,
    ToastrModule,
    ChecklistModule,
    TagInputModule,
    NgxToggleModule,
    BytesToSizePipe
  ]
})
export class GlobalSharedModule {
}

export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
