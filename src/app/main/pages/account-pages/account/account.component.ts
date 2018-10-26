import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('img') img: ElementRef;
  result64;
  defaultAvatar;
  user;
  profileForm = new FormGroup({
    lastname: new FormControl(''),
    firstname: new FormControl(''),
    phone: new FormControl(''),
    mail: new FormControl(''),
    address: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    avatar: new FormControl('')
  });

  constructor(private profileService: ProfileService,
              private router: Router) {
    this.defaultAvatar = environment.defaultAvatar;
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
      this.result64 = this.user.avatar;
    }, err => {
    });
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
      this.router.navigate(['/login']);
    }, err => {
    });
  }

}
