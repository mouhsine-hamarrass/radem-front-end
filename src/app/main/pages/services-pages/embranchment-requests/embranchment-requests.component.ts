import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {EmbranchmentRequestModel} from '../../../models/embranchment-request.model';

@Component({
  selector: 'app-embranchment-requests',
  templateUrl: './embranchment-requests.component.html',
  styleUrls: ['./embranchment-requests.component.scss']
})
export class EmbranchmentRequestsComponent implements OnInit {

  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;
  embranchmentRequests: Array<EmbranchmentRequestModel>;
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
    }, err => {
      console.log(err)
    });
  }

  getEmbranchments(contractNo: string): void {
    this.services.getEmbranchmentRequests(contractNo, this.page, this.pageSize)
      .subscribe(response => {
        this.embranchmentRequests = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => {
      });
  }

  setContract(contractNo: string) {
    this.contractNo = contractNo;
    this.getEmbranchments(this.contractNo);
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getEmbranchments(this.contractNo);
  }
}
