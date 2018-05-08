import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {GlobalSharedModule} from '../../shared/global-shared.module';

@NgModule({
   imports: [
      CommonModule,
      GlobalSharedModule,
      RouterModule
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
