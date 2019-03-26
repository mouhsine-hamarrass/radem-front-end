import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import swal from 'sweetalert2';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  profiles: any = [];
  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.getProfiles();
  }

  onSorted(sort: any): void {
    this.sort = sort;
    this.getProfiles();
  }

  onFiltred(filter: any): void {
    this.filter = filter;
    this.getProfiles();
  }

  getProfiles() {
    this.adminService.getPageableListProfiles(this.page, this.pageSize, this.filter, this.sort).subscribe(response => {
      this.profiles = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getProfiles();
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.getProfiles();
  }

  dropProfile(idProfile: number) {
    swal({
      title: this.translate.instant('ARE_YOU_SURE_TO_DELETE_PROFILE'),
      text: this.translate.instant('THIS_ACTION_IS_IRREVERSIBLE'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: this.translate.instant('CANCEL'),
      confirmButtonText: this.translate.instant('YES_DELETE')
    }).then((result) => {
      if (result.value) {
        if (this.profiles.find(profil => profil.id === idProfile).users === 0) {
          this.adminService.dropProfile(idProfile).subscribe(response => {
            this.profiles.splice(this.profiles.indexOf(this.profiles.find(profil => profil.id === idProfile)), 1);
            this.toastrService.success(this.translate.instant('THE_PROFILE_HAS_BEEN_DELETED'), this.translate.instant('DELETE_!'));
          });
        } else {
          this.toastrService.error(this.translate.instant('THE_PROFILE_CAN_NOT_BE_DELETED'), this.translate.instant('PREVIOUSLY_USED_PROFILE'));
        }
      }
    });
  }

}
