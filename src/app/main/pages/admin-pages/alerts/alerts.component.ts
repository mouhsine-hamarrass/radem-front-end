import {Component, OnInit, TemplateRef} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AlertModel} from '../../../models/alert.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts: any = Array<AlertModel>();
  disabled = false;
  page = 1;
  pageSize = 5;
  numberOfItems: number;
  itemsPerPage: number;
  totalElements: number;
  totalPages: number;
  keyword: string;

  alertId: number;

  modalRef: BsModalRef;

  private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-md'};

  constructor(private adminService: AdminService,
              private toastrService: ToastrService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getAlerts();
  }

  getAlerts() {
    this.adminService.getPageableAlerts(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alerts = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.adminService.getPageableAlerts(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alerts = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  searchAlerts(keyword: string): void {
    this.page = 1;
    this.keyword = keyword;
    this.adminService.getPageableAlerts(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alerts = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  filterAlerts(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.adminService.getPageableAlerts(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alerts = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  dropAlert(alertId: number) {
    swal({
      title: 'êtes vous sûr?',
      text: 'Cette action est irréversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dd3333',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        this.adminService.dropAlert(alertId).subscribe(response => {
          this.alerts.splice(this.alerts.indexOf(this.alerts.find(alert => alert.id === alertId)), 1);
          this.toastrService.success('L\'alerte a été supprimée.', 'Supprimer !');
        }, err => {
          this.toastrService.error('L\'alerte ne peut pas être supprimée!', 'L\'alerte est déjà utilisée');
        });
      }
    });
  }

  showAlertForm(template: TemplateRef<any>, alertId: number) {
    this.alertId = alertId;

    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  refreshAlerts(doRefresh: boolean) {
    if (doRefresh) {
      this.getAlerts();
    }
  }
}
