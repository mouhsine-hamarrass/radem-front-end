import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AdminService} from '../../../services/admin.service';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap';
import {ServiceModel} from '../../../models/service.model';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: any = Array<ServiceModel>();
  disabled = false;
  page = 1;
  pageSize = 5;
  numberOfItems: number;
  itemsPerPage: number;
  totalElements: number;
  totalPages: number;
  keyword: string;

  serviceId: number;

  modalRef: BsModalRef;

  private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-md'};

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.adminService.getPageableServices(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.services = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.adminService.getPageableServices(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.services = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  searchServices(keyword: string): void {
    this.page = 1;
    this.keyword = keyword;
    this.adminService.getPageableServices(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.services = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  filterServices(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.adminService.getPageableServices(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.services = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  removeService(serviceId: number) {
    swal({
      title: 'êtes vous sûr?',
      text: 'Cette action est irréversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dd6366',
      cancelButtonColor: '#404E67',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        this.adminService.removeService(serviceId).subscribe(response => {
          this.services.splice(this.services.indexOf(this.services.find(alertType => alertType.id === serviceId)), 1);
          this.toastrService.success('Le service a été supprimé.', 'Supprimé !');
        }, err => {
          this.toastrService.error('le service ne peut pas être supprimé!', 'Ce service est déjà utilisé');
        });
      }
    });
  }

  showServiceForm(template: TemplateRef<any>, serviceId: number) {
    this.serviceId = serviceId;

    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  refreshServices(doRefresh: boolean) {
    if (doRefresh) {
      this.getServices();
    }
  }
}
