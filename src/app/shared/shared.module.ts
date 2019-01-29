import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SecondNavbarComponent} from './second-navbar/second-navbar.component';
import {PrintService} from './services/print.service';
import {DataService} from './services/data.service';
import {LoginComponent} from '../login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MomentModule} from 'ngx-moment';
import {ChartsModule} from 'ng2-charts';
import {ArchwizardModule} from 'angular-archwizard';
import {NgxToggleModule} from 'ngx-toggle';
import {ChecklistModule} from 'angular-checklist';
import {
    AccordionModule,
    AlertModule,
    BsDatepickerModule,
    BsDropdownModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    ModalModule,
    PaginationModule,
    PopoverModule,
    SortableModule,
    TabsModule,
    TooltipModule
} from 'ngx-bootstrap';
import {QuillModule} from 'ngx-quill';
import {PipesModule} from './pipes/pipes.module';
import {DirectivesModule} from './directives/directives.module';
import {ComponentsModule} from './components/components.module';
import {SortTableDirective} from './directives/sort-table.directive';
import {FilterColumnComponent} from './components/tables/filter-column/filter-column.component';
import {FilterTableDirective} from './directives/filter-table.directive';
import {SortService} from './services/sort.service';
import {FilterService} from './services/filter.service';
import {SortableColumnComponent} from './components/tables/sortable-column/sortable-column.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        SecondNavbarComponent,
        LoginComponent,
        SortTableDirective,
        SortableColumnComponent,
        FilterColumnComponent,
        FilterTableDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        NgbModule.forRoot(),
        MomentModule,
        ChartsModule,
        BsDatepickerModule.forRoot(),
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
        ArchwizardModule,
        NgxToggleModule,
        ChecklistModule,
        QuillModule,
        PipesModule,
        DirectivesModule,
        ComponentsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        OwlMomentDateTimeModule,
        AngularMultiSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FooterComponent,
        TranslateModule,
        NgbModule,
        MomentModule,
        ChartsModule,
        BsDatepickerModule,
        NavbarComponent,
        SidebarComponent,
        SecondNavbarComponent,
        LoginComponent,
        ArchwizardModule,
        NgxToggleModule,
        ChecklistModule,
        QuillModule,
        PipesModule,
        DirectivesModule,
        ComponentsModule,
        SortTableDirective,
        FilterTableDirective,
        SortableColumnComponent,
        FilterColumnComponent,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        OwlMomentDateTimeModule,
        AngularMultiSelectModule
    ],
    providers: [
        PrintService,
        DataService,
        SortService,
        FilterService
    ]
})
export class SharedModule {
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
