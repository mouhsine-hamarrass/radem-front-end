import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailValidatorDirective} from './email.directive';
import {FocusDirective} from './focus.directive';
import {HexadecimalValidatorDirective} from './hexadecimal.directive';
import {MatchHeightDirective} from './match-height.directive';
import {MaxDateTodayValidatorDirective} from './maxDateToday.directive';
import {NumericValidatorDirective} from './numeric.directive';
import {PasswordValidatorDirective} from './password-valid.directive';
import {DateValidatorDirective} from './date.directive';
import {ToggleFullScreenDirective} from './toggle-full-screen.directive';
import {PasswordMatchDirective} from './password-match.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    DateValidatorDirective,
    EmailValidatorDirective,
    FocusDirective,
    HexadecimalValidatorDirective,
    MatchHeightDirective,
    MaxDateTodayValidatorDirective,
    NumericValidatorDirective,
    ToggleFullScreenDirective,
    PasswordMatchDirective,
    PasswordValidatorDirective
  ],
  declarations: [
    DateValidatorDirective,
    EmailValidatorDirective,
    FocusDirective,
    HexadecimalValidatorDirective,
    MatchHeightDirective,
    MaxDateTodayValidatorDirective,
    NumericValidatorDirective,
    ToggleFullScreenDirective,
    PasswordMatchDirective,
    PasswordValidatorDirective
  ]
})
export class DirectivesModule { }
