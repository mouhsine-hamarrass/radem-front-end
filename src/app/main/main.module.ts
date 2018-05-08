import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalSharedModule, MY_MOMENT_FORMATS} from '../shared/global-shared.module';
import {OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import {UtilsService} from './core/services/utils.service';

@NgModule({
   imports: [
      CommonModule,
      GlobalSharedModule,
      SharedModule
   ],
   exports: [],
   declarations: [HomeComponent],
   providers: [
      {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
      UtilsService
   ]
})
export class MainModule {
}
