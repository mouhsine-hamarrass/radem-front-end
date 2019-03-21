import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {RecoverPasswordService} from '../main/services/recover-password.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl(''),
    confirmedPassword: new FormControl('')
  });


  constructor(
    private recoverPasswordServices: RecoverPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService,

  ) {
  }

  ngOnInit() {
  }

  resetPassword() {
    if (this.resetPasswordForm.controls.newPassword === this.resetPasswordForm.controls.confirmedPassword) {
          return;     }
    const token = this.route.snapshot.queryParams.token;
    this.recoverPasswordServices.resetPassword(token, this.resetPasswordForm.controls.newPassword.value).subscribe(Response => {
       this.router.navigate(['/login']);
      this.toastrService.success(this.translate.instant('ACCOUNT_UPDATED'), '');

    }, err => {
    });

  }

}
