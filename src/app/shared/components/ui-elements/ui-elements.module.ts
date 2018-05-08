import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, BsDatepickerModule} from 'ngx-bootstrap';
import {HexadecimalValidatorDirective} from '../../directives/hexadecimal.directive';
import {NumericValidatorDirective} from '../../directives/numeric.directive';
import {DateValidatorDirective} from '../../directives/date.directive';
import {EmailValidatorDirective} from '../../directives/email.directive';
import {MaxDateTodayValidatorDirective} from '../../directives/maxDateToday.directive';
import {PasswordValidatorDirective} from '../../directives/password-valid.directive';
import {FocusDirective} from '../../directives/focus.directive';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AlertModule.forRoot(),
      BsDatepickerModule.forRoot(),
   ],
   declarations: [
      HexadecimalValidatorDirective,
      NumericValidatorDirective,
      DateValidatorDirective,
      EmailValidatorDirective,
      MaxDateTodayValidatorDirective,
      PasswordValidatorDirective,
      FocusDirective
   ],
   providers: [],
   exports: [
      HexadecimalValidatorDirective,
      NumericValidatorDirective,
      DateValidatorDirective,
      EmailValidatorDirective,
      MaxDateTodayValidatorDirective,
      PasswordValidatorDirective
   ]
})
export class UIElementsModule {
}
