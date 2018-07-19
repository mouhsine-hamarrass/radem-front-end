import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecoverPasswordService } from '../../services/recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  protected recoverPasswordForm = new FormGroup({
    email: new FormControl('')
  });
  protected message;

  constructor(private recoverPasswordServices: RecoverPasswordService) { }

  ngOnInit() {
  }

  reset() {
    this.recoverPasswordServices.sendToken(this.recoverPasswordForm.controls.email.value).subscribe(response => {
      this.message = 'verifier votre boite de reception!';
    },
      err => {console.log(err); });
  }

}
