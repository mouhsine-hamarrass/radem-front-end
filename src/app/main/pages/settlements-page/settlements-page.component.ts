import {Component, OnInit, TemplateRef, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {UtilsService} from '../../services/utils.service';
import {ServicesService} from '../../services/services.service';
import {ContractsService} from '../../services/contracts.service';
import {User} from '../../models/user.model';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {ContractAttachModel} from '../../models/contract-attach.model';
import * as moment from 'moment';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PieceModel} from '../../models/piece.model';
import {PieceDetailModel} from '../../models/pieceDetail.model';
import {SendContractModel} from '../../models/SendContract.model';
import {debug} from 'util';
import {Setting} from '../../models/setting.model';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements-page.component.html',
  styleUrls: ['./settlements-page.component.scss']
})
export class SettlementsPageComponent implements OnInit {
  public user: User;
  clientContracts: Array<ContractAttachModel>;
  public pieces: Array<PieceModel>;
  public piecesDetail: Array<PieceDetailModel>;
  selectedContract: string;
  public contractId: any;
  public date: Date;
  public contractForm: FormGroup;

  modalRef: BsModalRef;

  today: any = moment();
  minDate: any = moment().subtract(5, 'years');

  piece: string;

  @Input() Contractsettlement: string;

  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;

  page2 = 1;
  pageSize2 = 0;
  totalElements2: number;
  totalPages2: number;
  numberOfItems2: number;
  itemsPerPage2: number;

  advices: Setting;
  sort: any;
  filter: any;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private contractServices: ContractsService,
              private modalService: BsModalService,
              private adminService: AdminService,
              private formBuilder: FormBuilder,
              private utilsService: UtilsService,
              private services: ServicesService) {
    this.contractForm = this.formBuilder.group({
      contract: ['', Validators.required]
      // startDate: [this.today, Validators.required],
      // endDate: [this.today, Validators.required]
    });
  }


  ngOnInit() {
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }
    this.getAdvice();
    this.getClientAttachedContracts();

  }

  getClientAttachedContracts() {
    debugger;
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
    this.getSettlements();
  }

  onFiltred(filter: any): void {
    this.filter = filter;
    this.getSettlements();
  }

  getSettlements() {
    let contract = this.contractForm.controls['contract'].value;
    if (contract === undefined) {
      contract = this.clientContracts[0].contractNo;
    }
    // const startDate = moment(new Date(this.contractForm.controls['startDate'].value));
    //  const endDate = moment(new Date(this.contractForm.controls['endDate'].value));
    this.adminService.getPageableSettlements(contract,
      this.page, this.pageSize)
      .subscribe(response => {
        this.pieces = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => {
      });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getSettlements();
  }

  pageDetailChanged(page: number): void {
    this.page2 = page;
    // tslint:disable-next-line:max-line-length
    this.adminService.getPageableDetailSettlements(this.piece, this.page2, this.pageSize2).subscribe(responseDetailSettlements => {
      // this.piece = responseDetailSettlements.data;
      this.piecesDetail = responseDetailSettlements.data['content'];
      this.totalElements2 = responseDetailSettlements.data['totalElements'];
      this.totalPages2 = responseDetailSettlements.data['totalPages'];
      this.itemsPerPage2 = responseDetailSettlements.data['size'];
      this.numberOfItems2 = responseDetailSettlements.data['numberOfElements'];

      //   this.modalRef = this.modalService.show('5', this.config);
      // }, error => console.log(error));
    }, err => console.log(err));
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.getSettlements();
  }

  recherche() {
    /*
    this.contractServices.getSettlementsByContract(this.contractId).subscribe(response => {
        this.settlements = response;
    })
    */
  }

  setContract(id: any) {
    localStorage.setItem('SELECTED_CONTRACT', id);
    this.page = 1;
    this.pageSize = 0;

    this.page2 = 1;
    this.pageSize2 = 0;

    this.contractId = id;
    this.getSettlements();
  }

  getConsumptionReport() {
    this.utilsService.getSettlementsReport().subscribe(response => {
      console.log(response);
    })
  }

  downloadXlsSettlements() {
    /*
    this.services.downloadXlsSettlements().subscribe((response) => {
      if (response && response['body']) {
        const file = new FileModel('mes-reglements.xls', CommonUtil._arrayBufferToBase64(response['body']));

        CommonUtil.downloadFile(file);
      }
    });
    */
  }

  // downloadPdfSettlements() {
  //     const contract = this.contractForm.controls['contract'].value;
  //     const startDate = moment(new Date(this.contractForm.controls['startDate'].value));
  //     const endDate = moment(new Date(this.contractForm.controls['endDate'].value));
  //     this.services.downloadPdfSettlements(contract, startDate, endDate).subscribe((response) => {
  //         if (response && response['body']) {
  //             const file = new FileModel('mes-reglements.pdf', CommonUtil._arrayBufferToBase64(response['body']));
  //
  //             CommonUtil.downloadFile(file);
  //         }
  //     });
  // }


  openReceiptDetails(template: TemplateRef<any>, ReceiptNum: string) {
    if (ReceiptNum) {
      this.adminService.getPageableDetailSettlements(ReceiptNum, this.page2, this.pageSize2).subscribe(responseDetailSettlements => {

        this.piecesDetail = responseDetailSettlements.data['content'];
        this.totalElements2 = responseDetailSettlements.data['totalElements'];
        this.totalPages2 = responseDetailSettlements.data['totalPages'];
        this.itemsPerPage2 = responseDetailSettlements.data['size'];
        this.numberOfItems2 = responseDetailSettlements.data['numberOfElements'];

        this.modalRef = this.modalService.show(template, this.config);
        // }, error => console.log(error));
      }, err => console.log(err));
      this.piece = ReceiptNum;
    }

  }

  getAdvice() {
    this.adminService.getAdvices().subscribe(
        response => {
          this.advices = response.data;
        }, err => {
          console.log(err)
        });
  }
}
