import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RecoverPasswordService} from '../main/services/recover-password.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  private translate: TranslateService;
  recoverPasswordForm = new FormGroup({
    email: new FormControl('')
  });
  message;

  constructor(
    private recoverPasswordServices: RecoverPasswordService
  ) {
  }

  ngOnInit() {
  }

  reset() {
    this.recoverPasswordServices.sendToken(this.recoverPasswordForm.controls.email.value).subscribe(response => {
        this.message = this.translate.instant('CHECK_YOUR_INBOX');
      },
      err => {
        console.log(err);
      });
  }

}
