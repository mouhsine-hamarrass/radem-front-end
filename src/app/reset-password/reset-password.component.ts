import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

  resetPassword() {
    const newPassword = this.resetPasswordForm.controls.newPassword.value;
    const confirmedPassword = this.resetPasswordForm.controls.confirmedPassword.value;
    if (newPassword && newPassword === confirmedPassword) {
      const token = this.route.snapshot.queryParams.token;
      this.recoverPasswordServices.resetPassword(token, newPassword).subscribe(Response => {
        this.router.navigate(['/login']);
        this.toastrService.success(this.translate.instant('ACCOUNT_UPDATED'), '');

      }, err => {
      });

    } else if (!newPassword || !confirmedPassword) {
      this.toastrService.error(this.translate.instant('COMPLETE_THE_FORM'));
    } else if (newPassword !== confirmedPassword) {
      this.toastrService.error(this.translate.instant('PASSWORD_AND_CONFIRMED_PASSWORD_MUST_BE_UNIQUE'));
    }
  }

}
