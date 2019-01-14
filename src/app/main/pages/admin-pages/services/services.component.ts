import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AdminService} from '../../../services/admin.service';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap';
import {ServiceModel} from '../../../models/service.model';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

    services: any = Array<ServiceModel>();
    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;

    serviceId: number;
    private translate: TranslateService;

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

    onSorted(sort: any): void {
        this.sort = sort;
        this.getServices();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getServices();
    }

    getServices() {
        this.adminService.getPageableServices(this.page, this.pageSize, this.filter, this.sort).subscribe(response => {
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
        this.getServices();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getServices();
    }

    removeService(serviceId: number) {
        swal({
            title: this.translate.instant('ARE_YOU_SURE'),
            text: this.translate.instant('THIS_ACTION_IS_IRREVERSIBLE'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd6366',
            cancelButtonColor: '#404E67',
            cancelButtonText: this.translate.instant('CANCEL'),
            confirmButtonText: this.translate.instant('YES_DELETE')
        }).then((result) => {
            if (result.value) {
                this.adminService.removeService(serviceId).subscribe(response => {
                    this.services.splice(this.services.indexOf(this.services.find(alertType => alertType.id === serviceId)), 1);
                    this.toastrService.success(this.translate.instant('THE_SERVICE_HAS_BEEN_DELETED'), this.translate.instant('DELETE_!'));
                }, err => {
                    this.toastrService.error(this.translate.instant('THE_SERVICE_CAN_NOT_BE_DELETED'), this.translate.instant('THIS_SERVICE_IS_ALREADY_USED'));
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
