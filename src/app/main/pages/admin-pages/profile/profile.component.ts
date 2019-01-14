import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {UtilsService} from '../../../services/utils.service';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  authorities: any;
  selectedAuthorities: any = [];
  profile: Profile = {};
  formProfile;
  FormGroup;
  isSubmitted = false;
  private translate: TranslateService;

  constructor(
    private utilsService: UtilsService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.formProfile = this.formBuilder.group({
      title: ['', Validators.required],
      description: []
    });
  }

  get title() {
    return this.formProfile.get('title');
  }

  get description() {
    return this.formProfile.get('description');
  }

  ngOnInit() {
    this.getAllAuthoritiesByCategory();
    this.getProfile();
  }

  getProfile() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adminService.getProfile(id).subscribe(response => {
        this.profile = response.data;
        this.loadProfile();
      });
    }
  }

  loadProfile() {
    this.title.setValue(this.profile.title);
    this.description.setValue(this.profile.description);
    this.selectedAuthorities = this.profile.authoritiesIds;
  }


  getAllAuthoritiesByCategory() {
    this.utilsService.getAuthorities().subscribe(response => {
      this.authorities = response.data;
    });
  }

  addProfile() {
    this.isSubmitted = true;
    this.profile.title = this.formProfile.controls.title.value;
    this.profile.description = this.formProfile.controls.description.value;
    this.profile.authoritiesIds = [];
    this.profile.authoritiesIds = this.selectedAuthorities;
    this.adminService.saveProfile(this.profile).subscribe(response => {
      if (this.profile.id == null) {
        this.toastrService.success(this.translate.instant('PROFILE_ADDED'), '', {
          timeOut: 2000,
        });
      } else {
        this.toastrService.success(this.translate.instant('MODIFIED_PROFILE'), '', {
          timeOut: 2000,
        });
      }
      this.router.navigate(['/admin/profiles']);
    }, err => {
    });
  }
}
