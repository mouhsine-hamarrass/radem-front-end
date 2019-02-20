import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {SubscriptionRequestModel} from '../../../models/subscription-request.model';

@Component({
  selector: 'app-subscription-requests',
  templateUrl: './subscription-requests.component.html',
  styleUrls: ['./subscription-requests.component.scss']
})
export class SubscriptionRequestsComponent implements OnInit {

  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;
  subscriptionRequests: Array<SubscriptionRequestModel>;
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

  getSubscriptions(contractNo: string): void {
    this.services.getSubscriptionRequests(contractNo, this.page, this.pageSize)
      .subscribe(response => {
        this.subscriptionRequests = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => {
      });
  }

  setContract(contractNo: string) {
    this.contractNo = contractNo;
    this.getSubscriptions(this.contractNo);
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getSubscriptions(this.contractNo);
  }


}
