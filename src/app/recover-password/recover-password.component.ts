import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecoverPasswordService} from '../main/services/recover-password.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  private translate: TranslateService;
  recoverPasswordForm;
  message = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private recoverPasswordServices: RecoverPasswordService
  ) {
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');

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
