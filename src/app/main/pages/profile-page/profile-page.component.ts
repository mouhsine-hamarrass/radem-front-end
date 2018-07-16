import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  protected user;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getUser(1).subscribe(response => this.user = response.data, err => {});
  }

}
