import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertNotificationsPageComponent} from './alert-notifications-page.component';
import {AlertNotificationsPageRoutingModule} from './alert-notifications-page-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AlertNotificationsPageRoutingModule,
        SharedModule
    ],
    declarations: [AlertNotificationsPageComponent]
})
export class AlertNotificationsPageModule {
}
