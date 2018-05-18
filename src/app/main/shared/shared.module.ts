import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {GlobalSharedModule} from '../../shared/global-shared.module';
import {AccountModule} from '../account/account.module';
import {MyServicesModule} from '../my-services/my-services.module';


@NgModule({
   imports: [
      CommonModule,
      GlobalSharedModule,
      RouterModule,
     AccountModule,
     MyServicesModule
   ],
   declarations: [
      SidebarComponent,
      NavbarComponent
   ],
   exports: [
      GlobalSharedModule,
      SidebarComponent,
      NavbarComponent
   ]
})
export class SharedModule {
}
