import {AbstractControl} from '@angular/forms';
import {Directive, OnInit, Input, EventEmitter, ElementRef, Inject, Injectable} from '@angular/core';
import {ProfileService} from '../../main/services/profile.service';

@Directive({
  // tslint:disable-next-line
  selector: '[oldPasswordMatch]'
})
export class OldPasswordMatchDirective {

  profileService: ProfileService;

  constructor(profileService: ProfileService) {
    this.profileService = profileService;
  }

  OldPasswordMatch(AC: AbstractControl) {
    if (AC.get('oldPassword')) {
      const password = AC.get('oldPassword').value;
      const verified = this.profileService.verifyPassword(password);
      if (!verified) {
        AC.get('oldPassword').setErrors({OldMatchPassword: true});
      } else {
        return null;
      }
    }
  }
}
