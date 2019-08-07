import {Component, ElementRef, Inject, Injectable, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../../core/services/security/auth.service';
import {PasswordMatchDirective} from '../../../../shared/directives/password-match.directive';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

@Injectable()
export class AccountComponent implements OnInit {

  @ViewChild('img') img: ElementRef;
  result64;
  defaultAvatar;
  editPassword = false;
  user: User;
  profileForm: FormGroup;

  constructor(private profileService: ProfileService,
              private router: Router,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private toastrService: ToastrService,
              @Inject('AuthService') private authService: AuthService,
              private authHelper: AuthHelper) {
    this.defaultAvatar = environment.defaultAvatar;
    this.profileForm = formBuilder.group({
      lastname: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
      address: new FormControl(''),
      username: new FormControl(''),
      editPassword: new FormControl(''),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      avatar: new FormControl('')
    }, {
      validator: PasswordMatchDirective.MatchPassword
    });
  }

  ngOnInit() {

    const user: User = this.authHelper.getLoggedUserInfo();
    this.setEditPasswordValidators();

    if (user && user.id) {
      this.profileService.getUser(user.id).subscribe(response => {
        this.user = response.data;
        this.profileForm.controls.lastname.setValue(this.user.lastname);
        this.profileForm.controls.firstname.setValue(this.user.firstname);
        this.profileForm.controls.phone.setValue(this.user.phone);
        this.profileForm.controls.mail.setValue(this.user.username);
        this.profileForm.controls.address.setValue(this.user.address);
        this.profileForm.controls.username.setValue(this.user.username);
        this.profileForm.controls.password.setValue('');
        this.result64 = this.user.avatar;
        console.log(this.user);
      }, err => {
      });
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  onFileChange(event) {
    this.img.nativeElement.style.display = 'block';
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.result64 = fileReader.result;
      };
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.toastrService.error(this.translate.instant('INVALID_FORM'), '');
      return;
    }
    const profile = {
      id: this.user.id,
      lastname: this.profileForm.controls.lastname.value,
      firstname: this.profileForm.controls.firstname.value,
      phone: this.profileForm.controls.phone.value,
      email: this.profileForm.controls.mail.value,
      address: this.profileForm.controls.address.value,
      username: this.profileForm.controls.username.value,
      password: this.profileForm.controls.password.value,
      avatar: this.result64
    };
    this.profileService.saveProfile(profile).subscribe(response => {
      console.log(response.data);
      if (response && response.data) {
        localStorage.setItem(AuthHelper.USER_ID, JSON.stringify(response.data));
        this.toastrService.success(this.translate.instant('SUCCESS_MODIFICATION'), '');
      } else {
        this.toastrService.error(this.translate.instant('OOPS_FAILED_CHANGE'), '');
      }
    }, err => {
    });
  }


  setEditPasswordValidators() {

    const firstNameControl = this.profileForm.get('password');
    const lastNameControl = this.profileForm.get('confirmPassword');

    this.profileForm.get('editPassword').valueChanges
      .subscribe(passwordInfos => {

        if (passwordInfos) {
          firstNameControl.setValidators([Validators.required]);

          lastNameControl.setValidators([Validators.required]);
        }

        if (!passwordInfos) {
          firstNameControl.setValidators(null);
          lastNameControl.setValidators(null);
        }

        firstNameControl.updateValueAndValidity();
        lastNameControl.updateValueAndValidity();
      });

  }
}
