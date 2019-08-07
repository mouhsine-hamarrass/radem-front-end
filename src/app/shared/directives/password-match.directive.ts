import {AbstractControl} from '@angular/forms';
import {Directive, OnInit, Input, EventEmitter, ElementRef, Inject, Injectable} from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[passwordMatch]'
})
export class PasswordMatchDirective {

  static MatchPassword(AC: AbstractControl) {
    if (AC.get('password') && AC.get('confirmPassword')) {
      const password = AC.get('password').value; // to get value in input tag
      const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if (password !== confirmPassword) {
        AC.get('confirmPassword').setErrors({MatchPassword: true});
      } else {
        return null;
      }
    }
  }
}
