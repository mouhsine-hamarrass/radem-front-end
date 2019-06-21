import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {UtilsService} from '../../services/utils.service';
import {ServicesService} from '../../services/services.service';
import {ContractsService} from '../../services/contracts.service';
import {User} from '../../models/user.model';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {ContractAttachModel} from '../../models/contract-attach.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {InvoiceModel} from '../../models/invoice.model';
import {FileModel} from '../../../core/models/file.model';
import {CommonUtil} from '../../../core/helpers/common.util';
import {ToastrService} from 'ngx-toastr';
import {InvoiceDetailsModel} from '../../models/invoice-details.model';
import {InvoiceHistoryModel} from '../../models/invoice-history.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices-page.component.html',
  styleUrls: ['./invoices-page.component.scss']
})
export class InvoicesPageComponent implements OnInit {
  public user: User;
  clientContracts: Array<ContractAttachModel>;
  selectedContract: string;
  public contractId: any;
  public date: Date;
  public contractForm: FormGroup;

  private resp: HttpResponse<any>;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  page = 1;
  pageSize = 10;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;

  pageDetails = 1;
  pageSizeDetails = 10;
  totalElementsDetails: number;
  totalPagesDetails: number;
  numberOfItemsDetails: number;
  itemsPerPageDetails: number;

  pageHistory = 1;
  pageSizeHistory = 10;
  totalElementsHistory: number;
  totalPagesHistory: number;
  numberOfItemsHistory: number;
  itemsPerPageHistory: number;

  invoice: InvoiceModel;
  invoiceDetail: InvoiceDetailsModel;
  invoiceHistory: InvoiceHistoryModel;

  public invoices: Array<InvoiceModel>;
  public detailsInvoice: Array<InvoiceDetailsModel>;
  public historiesInvoice: Array<InvoiceHistoryModel>;

  sort: any;
  filter: any;

  constructor(private contractServices: ContractsService,
              private modalService: BsModalService,
              private adminService: AdminService,
              private formBuilder: FormBuilder,
              private utilsService: UtilsService,
              private toastrService: ToastrService,
              private services: ServicesService) {
    this.contractForm = this.formBuilder.group({
      contract: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }
    this.getClientAttachedContracts();
  }

  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
      if (this.clientContracts.length) {
        this.selectedContract = this.clientContracts[0].contractNo;
        const clientContractsNo = [];
        this.clientContracts.forEach(function (value) {
          clientContractsNo.push(value.contractNo);
        });
        const savedContractNo = localStorage.getItem('SELECTED_CONTRACT');
        if (savedContractNo && clientContractsNo.includes(savedContractNo)) {
          this.selectedContract = localStorage.getItem('SELECTED_CONTRACT');
        }
        this.setContract(this.selectedContract);
      }
    }, err => {
      console.log(err)
    });
  }

  onSorted(sort: any): void {
    this.sort = sort;
    this.getInvoices();
  }

  onFiltred(filter: any): void {
    this.filter = filter;
    this.getInvoices();
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getInvoices();
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.getInvoices();
  }

  getInvoices() {
    let contract = this.contractForm.controls['contract'].value;
    if (contract === undefined && this.clientContracts) {
      contract = this.clientContracts[0].contractNo;
    }
    this.adminService.getInvoices(contract, this.page, this.pageSize)
      .subscribe(response => {
        this.invoices = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => {
      });
    /*this.invoices = [
      new InvoiceModel('EAU', '0000001', '2019', '03', '00000001', '33.4',
        '23423', '14555', '04/03/2019', '04/06/2019', 'Impayée',
        30)
    ];*/
  }

  pageDetailsChanged(page: number): void {
    this.pageDetails = page;
    if (this.invoice) {
      this.adminService.getInvoiceDetails(this.selectedContract, this.invoice.invNo, this.pageDetails, this.pageSizeDetails)
        .subscribe(response => {
          this.detailsInvoice = response.data['content'];
          this.totalElementsDetails = response.data['totalElements'];
          this.totalPagesDetails = response.data['totalPages'];
          this.itemsPerPageDetails = response.data['size'];
          this.numberOfItemsDetails = response.data['numberOfElements'];

        }, err => console.log(err));
    }
  }

  pageHistoryChanged(page: number): void {
    this.pageHistory = page;
    if (this.invoice) {
      this.adminService.getInvoiceHistory(this.selectedContract, this.pageHistory, this.pageSizeHistory)
        .subscribe(response => {
          this.historiesInvoice = response.data['content'];
          this.totalElementsHistory = response.data['totalElements'];
          this.totalPagesHistory = response.data['totalPages'];
          this.itemsPerPageHistory = response.data['size'];
          this.numberOfItemsHistory = response.data['numberOfElements'];

        }, err => console.log(err));
    }
  }

  setContract(id: any) {
    localStorage.setItem('SELECTED_CONTRACT', id);
    this.page = 1;
    this.pageSize = 0;
    this.contractId = id;
    this.getInvoices();
  }

  downloadInvoicePdf(fileId: any) {
    if (!fileId) {
      this.toastrService.warning('Aucun fichier disponible', '');
      return;
    }
    this.services.getAttachment(fileId).subscribe((response) => {
        if (response) {
          if (response.status === 'NO_CONTENT') {
            this.toastrService.warning('Aucun fichier disponible', '');
          } else if (response.data) {
            this.services.downloadAttachmentById(fileId).subscribe((res) => {
              if (res && res['body']) {
                let title = '';
                if (response.data.extension && response.data.name) {
                  title = response.data.name.split('.', 1) + '.' + response.data.extension;
                } else {
                  title = 'facture_' + fileId + '.pdf';
                }
                const file = new FileModel(title, CommonUtil._arrayBufferToBase64(res['body']));
                CommonUtil.downloadFile(file);
              }
            });
          }
        }
      }
    );
  }

  openInvoiceDetails(template: TemplateRef<any>, invoice: InvoiceModel) {
    if (invoice) {
      this.invoice = invoice;
      this.adminService.getInvoiceDetails(invoice.ctrNo, invoice.invNo, this.pageDetails, this.pageSizeDetails).subscribe(response => {

        if (response && response.data) {
          this.detailsInvoice = response.data['content'];
          this.totalElementsDetails = response.data['totalElements'];
          this.totalPagesDetails = response.data['totalPages'];
          this.itemsPerPageDetails = response.data['size'];
          this.numberOfItemsDetails = response.data['numberOfElements'];
        }
        this.pageHistoryChanged(this.pageHistory);

      }, err => console.log(err));
      this.modalRef = this.modalService.show(template, this.config);
    }

  }
}
