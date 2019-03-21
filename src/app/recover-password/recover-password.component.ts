import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RecoverPasswordService} from '../main/services/recover-password.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {message} from '../shared/components/ui-elements/validate';

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
  message = '';

  constructor(
    private router: Router,
    private recoverPasswordServices: RecoverPasswordService
  ) {
  }

  ngOnInit() {
  }

  reset() {
    this.recoverPasswordServices.sendToken(this.recoverPasswordForm.controls.email.value).subscribe(response => {
        this.message = 'MSG_SENT';
      },
      err => {
        console.log(err);
      });

  }

}
