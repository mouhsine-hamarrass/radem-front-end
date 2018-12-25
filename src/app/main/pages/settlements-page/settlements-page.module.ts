import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SettlementsPageComponent} from './settlements-page.component';
import {SettlementsPageRoutingModule} from './settlements-page-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SettlementsPageRoutingModule,
        AngularFontAwesomeModule,
        ComponentsModule,
        BsDropdownModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        SettlementsPageComponent
    ]
})
export class SettlementsPageModule {
}
