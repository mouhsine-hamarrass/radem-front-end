import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {AlertTypeModel} from '../../../models/alert-type.model';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-alert-types',
  templateUrl: './alert-types.component.html',
  styleUrls: ['./alert-types.component.scss']
})
export class AlertTypesComponent implements OnInit {

  protected alertTypes: any = Array<AlertTypeModel>();
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
    this.adminService.getPageableAlertTypes(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alertTypes = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.adminService.getPageableAlertTypes(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alertTypes = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  searchAlertTypes(keyword: string): void {
    this.page = 1;
    this.keyword = keyword;
    this.adminService.getPageableAlertTypes(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alertTypes = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  filterAlertTypes(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.adminService.getPageableAlertTypes(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alertTypes = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  dropAlertType(alertTypeId: number) {
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
        if (this.alertTypes.find(alertType => alertType.id === alertTypeId).users === 0) {
          this.adminService.dropAlertType(alertTypeId).subscribe(response => {
            this.alertTypes.splice(this.alertTypes.indexOf(this.alertTypes.find(alertType => alertType.id === alertTypeId)), 1);
            this.toastrService.success('Le type d\'alerte a été supprimé.', 'Supprimé !');
          });
        } else {
          this.toastrService.error('le type d\'alerte ne peut pas être supprimé!', 'Ce type d\'alerte est déjà utilisé');
        }
      }
    });
  }
}
