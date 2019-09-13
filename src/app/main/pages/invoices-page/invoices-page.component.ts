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

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-xl'
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

  totalElementsHistory: number;
  totalPagesHistory: number;
  numberOfItemsHistory: number;
  itemsPerPageHistory: number;

  invoice: InvoiceModel;

  public invoices: Array<InvoiceModel>;
  public detailsInvoice: Array<InvoiceDetailsModel>;
  public historyInvoice: InvoiceHistoryModel;

  sort: any;
  filter: any;
  private clientDetails: any;

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
        this.getInvoices();
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
    this.adminService.getInvoices(this.selectedContract, this.page, this.pageSize)
      .subscribe(response => {
        this.invoices = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
        this.page = 1;
      }, err => {
      });
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
          this.pageDetails = 1;

        }, err => console.log(err));
    }
  }

  setContract(id: any) {
    localStorage.setItem('SELECTED_CONTRACT', id);
    this.page = 1;
    this.pageSize = 0;
    this.contractId = id;
    this.getInvoices();
    this.services.getClientDetailsByContractNo(id).subscribe(response => {
      this.clientDetails = response.data;
      console.log(this.clientDetails);
    }, err => {
      console.log(err)
    });
  }

  downloadInvoicePdf(fileId: any) {
    if (!fileId) {
      this.toastrService.warning('Aucun fichier disponible', '');
      return;
    }
    this.services.getAttachment(fileId).subscribe((response) => {
        if (response && response.data) {
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
    );
  }

  openInvoiceDetails(template: TemplateRef<any>, invoice: InvoiceModel) {
    this.invoice = invoice;
    if (invoice) {
      this.adminService.getInvoiceHistory(this.selectedContract, invoice.month, invoice.year)
        .subscribe(response => {
          this.historyInvoice = response.data;
        }, err => console.log(err));

      this.adminService.getInvoiceDetails(this.selectedContract, invoice.invNo, this.pageDetails, this.pageSizeDetails)
        .subscribe(response => {
          if (response && response.data) {
            this.detailsInvoice = response.data['content'];
            this.totalElementsDetails = response.data['totalElements'];
            this.totalPagesDetails = response.data['totalPages'];
            this.itemsPerPageDetails = response.data['size'];
            this.numberOfItemsDetails = response.data['numberOfElements'];
            this.pageDetails = 1;
          }
        }, err => console.log(err));
      this.modalRef = this.modalService.show(template, this.config);
    }
  }
}
