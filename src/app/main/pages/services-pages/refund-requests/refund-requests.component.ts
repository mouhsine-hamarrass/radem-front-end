import {Component, OnInit} from '@angular/core';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {ServicesService} from '../../../services/services.service';
import {AdminService} from '../../../services/admin.service';
import {SimpleRefundModel} from '../../../models/simpleRefund.model';
import {DynamicModel} from '../../../models/dynamic.model';

@Component({
  selector: 'app-refund-request',
  templateUrl: './refund-requests.component.html',
  styleUrls: ['./refund-requests.component.scss']
})
export class RefundRequestsComponent implements OnInit {

  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  selectedContract: string;
  filter: any;
  refundRequests: Array<SimpleRefundModel>;
  clientContracts: Array<ContractAttachModel>;
  contractNo: string;
  dynamic: DynamicModel;
  private clientDetails: any;

  constructor(private services: ServicesService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.getAdvice();
    this.getClientAttachedContracts();
  }


  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
      this.contractNo = this.clientContracts[1].contractNo;
      if (this.clientContracts && this.clientContracts.length) {
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
    });
  }

  getRefunds(contractNo: string): void {
    this.services.getRefundRequests(contractNo, this.page, this.pageSize)
      .subscribe(response => {
        this.refundRequests = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => {
      });
  }

  setContract(contractNo: string) {
    this.page = 1;
    this.pageSize = 0;
    localStorage.setItem('SELECTED_CONTRACT', contractNo);
    this.contractNo = contractNo;
    this.getRefunds(this.contractNo);
    this.services.getClientDetailsByContractNo(contractNo).subscribe(response => {
      this.clientDetails = response.data;
      console.log(this.clientDetails);
    }, err => {
      console.log(err)
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getRefunds(this.contractNo);
  }


  getAdvice() {
    this.adminService.getDynamicContent('conseil').subscribe(
      response => {
        this.dynamic = response.data;
      }, err => {
      });
  }

}
