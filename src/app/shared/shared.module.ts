import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ToggleFullscreenDirective} from './directives/toggle-fullscreen.directive';
import {SecondNavbarComponent} from './second-navbar/second-navbar.component';
import {SpinnerService} from './components/spinner/spinner.service';
import {PrintService} from './services/print.service';
import {DataService} from './services/data.service';
import {LoginComponent} from '../login/login.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {TruncatePipe} from './pipes/truncate.pipe';
import {HighlightPipe} from './pipes/highlight.pipe';
import {SortPipe} from './pipes/sort.pipe';
import {BytesToSizePipe} from './pipes/bytes-to-size.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MomentModule} from 'ngx-moment';
import {ToastrModule} from 'ngx-toastr';
import {ChartsModule} from 'ng2-charts';
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
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ArchwizardModule} from 'angular-archwizard';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule.forRoot(),
    MomentModule,
    ToastrModule.forRoot(),
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
    ArchwizardModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    TranslateModule,
    NgbModule,
    MomentModule,
    ToastrModule,
    ChartsModule,
    BsDatepickerModule,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    SecondNavbarComponent,
    LoginComponent,
    SpinnerComponent,
    TruncatePipe,
    HighlightPipe,
    SortPipe,
    BytesToSizePipe,
    ArchwizardModule
  ],
  providers: [
    SpinnerService,
    PrintService,
    DataService
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    SecondNavbarComponent,
    LoginComponent,
    SpinnerComponent,
    TruncatePipe,
    HighlightPipe,
    SortPipe,
    BytesToSizePipe
  ]
})
export class SharedModule {
}
