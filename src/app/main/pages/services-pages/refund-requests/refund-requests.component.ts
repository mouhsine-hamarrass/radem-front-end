import {Component, OnInit} from '@angular/core';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {ServicesService} from '../../../services/services.service';
import {Setting} from '../../../models/setting.model';
import {AdminService} from '../../../services/admin.service';
import {SimpleRefundModel} from '../../../models/simpleRefund.model';

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
  advices: Setting;

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
      if (this.clientContracts.length) {
        this.selectedContract = this.clientContracts[0].contractNo;
        this.setContract(this.clientContracts[0].contractNo);
      }
    }, err => {
      console.log(err)
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
    this.contractNo = contractNo;
    this.getRefunds(this.contractNo);
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getRefunds(this.contractNo);
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
