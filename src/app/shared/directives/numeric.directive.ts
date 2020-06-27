import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
   // tslint:disable-next-line
   selector: '[numeric][ngModel]',
   providers: [
      {provide: NG_VALIDATORS, useExisting: NumericValidatorDirective, multi: true}
   ]
})
export class NumericValidatorDirective {
  validate(control: AbstractControl): { [validator: string]: string } {
    if (!control || !control.value) { // the [required] validator will check presence, not us
      return null;
    }
    const expression = /^(\d+((\.|,)\d+)?)$/i;
    const value = typeof control.value === 'string' ? control.value.trim() : control.value;
    if (expression.test(value)) {
      return null;
    }
    return {numeric: 'Please enter a valid number'};
  }
}
