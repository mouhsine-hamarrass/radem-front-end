import { Component, OnInit } from '@angular/core';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {ServicesService} from '../../../services/services.service';

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
  filter: any;
  RefundRequests: Array<any>;
  clientContracts: Array<ContractAttachModel>;
  contractNo: string;

  constructor(private services: ServicesService) {
  }

  ngOnInit() {
    this.getClientAttachedContracts();
  }


  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
      if (this.clientContracts.length) {
        // this.setReportContract(this.clientContracts[0].contractNo);
      }
    }, err => {
      console.log(err)
    });
  }

  getRefunds(contractNo: string): void {
    this.services.getRefundRequests(contractNo, this.page, this.pageSize)
      .subscribe(response => {
        this.RefundRequests = response.data['content'];
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


}
