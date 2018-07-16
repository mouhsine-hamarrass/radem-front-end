import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl } from '../../../../../node_modules/@angular/forms';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  protected user;
  protected profileForm = new FormGroup({
      lastname: new FormControl(''),
      firstname: new FormControl(''),
      phone: new FormControl(''),
      mail: new FormControl(''),
      address: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('')
  });

  constructor(private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit() {
    this.profileService.getUser(1).subscribe(response => {
      this.user = response.data;
      console.log(this.user);
      this.profileForm.controls.lastname.setValue('test');
      this.profileForm.controls.firstname.setValue(this.user.firstname);
      this.profileForm.controls.phone.setValue(this.user.phone);
      this.profileForm.controls.mail.setValue(this.user.email);
      this.profileForm.controls.address.setValue(this.user.address);
      this.profileForm.controls.username.setValue(this.user.username);
      this.profileForm.controls.password.setValue('password');
    }, err => {});
  }

  saveProfile(): void {
    const profile = {
      id: this.user.id,
      lastname: this.profileForm.controls.lastname.value,
      firstname: this.profileForm.controls.firstname.value,
      phone: this.profileForm.controls.phone.value,
      email: this.profileForm.controls.mail.value,
      address: this.profileForm.controls.address.value,
      username: this.profileForm.controls.username.value,
      password: this.profileForm.controls.password.value
    };
    this.profileService.saveProfile(profile).subscribe(response => {
      console.log(response.data);
      this.router.navigate(['/login']);
    }, err => {});
  }

}
