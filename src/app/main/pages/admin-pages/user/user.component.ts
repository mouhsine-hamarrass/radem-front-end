import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UtilsService} from '../../../services/utils.service';
import {User} from '../../../models/user.model';
import {environment} from '../../../../../environments/environment';
import {ServiceModel} from '../../../models/service.model';
import {PasswordMatchDirective} from '../../../../shared/directives/password-match.directive';

import * as _ from 'underscore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('img') img: ElementRef;
  user: User;
  isSubmitted = false;
  defaultAvatar: any;
  result64: any;
  selectedAuthorities: any = [];
  listProfiles = [];
  listServices: Array<ServiceModel>;
  authorities: any = [];
  modalForm: FormGroup;
  emailPattern: string;
  edit = false;

  constructor(
    private translate: TranslateService,
    private utilsService: UtilsService,
    private adminService: AdminService,
    private frmBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    this.emailPattern = environment.emailPattern;
    this.modalForm = this.frmBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: [''],
      phone: ['', Validators.required],
      serviceId: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      profileId: ['', Validators.required],
      avatar: [''],
      address: [''],
      enabled: [''],
    }, {
      validator: PasswordMatchDirective.MatchPassword
    });
    this.defaultAvatar = environment.defaultAvatar;
  }

  get firstname() {
    return this.modalForm.get('firstname');
  }

  get phone() {
    return this.modalForm.get('phone');
  }

  get lastname() {
    return this.modalForm.get('lastname');
  }

  get username() {
    return this.modalForm.get('email');
  }

  get email() {
    return this.modalForm.get('email');
  }

  get password() {
    return this.modalForm.get('password');
  }

  get confirmPassword() {
    return this.modalForm.get('confirmPassword');
  }

  get profileId() {
    return this.modalForm.get('profileId');
  }

  // get serviceId() {
  //     return this.modalForm.get('serviceId');
  // }

  get avatar() {
    return this.modalForm.get('avatar');
  }

  get address() {
    return this.modalForm.get('address');
  }

  get enabled() {
    return this.modalForm.get('enabled');
  }

  getProfiles(): void {
    this.adminService.getListProfiles().subscribe((response) => {
      if (response && response.data) {
        this.listProfiles = response.data;
      }
    }, (err) => {
    });
  }

  getServices(): void {
    this.adminService.getServices().subscribe((response) => {
      this.listServices = response.data;
    }, (err) => {
    });
  }

  getAuthorities(id, excludedAuthoritiesIds?): void {
    this.adminService.getProfileAuthorities(id).subscribe((response) => {
      if (response && response.data) {
        this.authorities = response.data;
        this.selectedAuthorities = [];
        let arr = [];
        _.each(this.authorities, (authority: any) => {
          if (typeof authority === 'object' && authority.length) {
            arr = arr.concat(_.pluck(authority, 'id'));
          }
        });
        this.selectedAuthorities = arr;
        if (excludedAuthoritiesIds && excludedAuthoritiesIds.length) {
          this.selectedAuthorities = _.difference(arr, excludedAuthoritiesIds);
        }
      }
    }, (err) => {
    });
  }

  getUser() {
    const id: string = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.edit = true;
      this.adminService.getUser(id).subscribe(response => {
        if (response && response.data) {
          this.user = response.data;
          this.loadProfile(response.data);
        }
      }, (err) => {
        this.edit = false;
      });
    } else {
      this.edit = false;
    }
  }

  loadProfile(data) {
    this.modalForm.controls.firstname.setValue(data.firstname);
    this.modalForm.controls.lastname.setValue(data.lastname);
    this.modalForm.controls.phone.setValue(data.phone);
    this.modalForm.controls.email.setValue(data.email);
    this.modalForm.controls.username.setValue(data.username);
    this.modalForm.controls.profileId.setValue(data.profileId);
    this.modalForm.controls.serviceId.setValue(data.serviceId);
    this.getAuthorities(data.profileId, data.excludedAuthoritiesIds);
    this.result64 = data.avatar;
    this.modalForm.controls.address.setValue(data.address);
    this.modalForm.controls.enabled.setValue(data.enabled);
    // this.selectedAuthorities = data.excludedAuthoritiesIds;
    this.modalForm.removeControl('password');
    this.modalForm.removeControl('confirmPassword');
  }

  ngOnInit() {
    this.modalForm.controls.enabled.setValue(true);
    this.getProfiles();
    // this.getServices();
    this.getUser();
  }

  setFieldRequired(field, required) {
    if (required) {
      this.modalForm.controls[field].setValidators([Validators.required]);
    } else {
      this.modalForm.controls[field].clearValidators();
    }
    this.modalForm.controls[field].updateValueAndValidity();
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

  onProfileChange(profile) {
    if (profile && profile.value) {
      this.getAuthorities(profile.value);
    }
  }

  saveUser(modalForm): void {
    if (!modalForm.invalid) {
      this.isSubmitted = true;
      const user = _.omit(this.modalForm.value, ['confirmPassword']);
      user.avatar = this.result64;
      const arr = [];
      _.each(this.authorities, (authority: any) => {
        if (typeof authority === 'object' && authority !== null) {
          arr.push(authority.id);
        }
      });
      user.excludedAuthoritiesIds = _.difference(arr, this.selectedAuthorities);
      if (this.user && this.user.id) {
        user.id = this.user.id;
        this.adminService.editUser(user).subscribe((response) => {
          if (response && response.data) {
            this.toastrService.success(this.translate.instant('SUCCESS_OPERATION'), '');
            this.router.navigate(['/admin/users']);
          }
        }, (err) => {

        });
      } else {
        this.adminService.createUser(user).subscribe((response) => {
          if (response && response.data) {
            this.toastrService.success(this.translate.instant('SUCCESS_OPERATION'), '');
            this.router.navigate(['/admin/users']);
          }
        }, (err) => {
        });
      }
    }
  }
}
