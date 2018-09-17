import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../models/profile.model';
import swal from 'sweetalert2';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  protected profiles: any = [];
  protected disabled = false;
  protected page = 1;
  protected pageSize = 5;
  protected numberOfItems: number;
  protected itemsPerPage: number;
  protected totalElements: number;
  protected totalPages: number;
  protected keyword: string;

  constructor(private adminService: AdminService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles() {
    this.adminService.getPageableListProfiles(this.page, this.pageSize, this.keyword).subscribe(response => {
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
    this.adminService.getPageableListProfiles(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.profiles = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  searchprofiles(keyword: string): void {
    this.page = 1;
    this.keyword = keyword;
    this.adminService.getPageableListProfiles(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.profiles = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  filterprofiles(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.adminService.getPageableListProfiles(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.profiles = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  dropProfile(idProfile: number) {
    swal({
      title: 'êtes vous sûr?',
      text: 'Cette action est irréversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        if (this.profiles.find(profil => profil.id === idProfile).users === 0) {
          this.adminService.dropProfile(idProfile).subscribe(response => {
            this.profiles.splice(this.profiles.indexOf(this.profiles.find(profil => profil.id === idProfile)), 1);
            this.toastrService.success('Le profil a été supprimé.', 'Supprimé !');
          });
        } else {
          this.toastrService.error('le profil ne peut pas être supprimé!', 'Profile déjà utilisé');
        }
      }
    });
  }

}
