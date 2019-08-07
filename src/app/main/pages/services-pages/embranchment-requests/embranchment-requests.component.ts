import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {EmbranchmentRequestModel} from '../../../models/embranchment-request.model';
import {AdminService} from '../../../services/admin.service';
import {DynamicModel} from '../../../models/dynamic.model';

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
  dynamic: DynamicModel;
  selectedContract: string;

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
    localStorage.setItem('SELECTED_CONTRACT', contractNo);
    this.contractNo = contractNo;
    this.getEmbranchments(this.contractNo);
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getEmbranchments(this.contractNo);
  }

  getAdvice() {
    this.adminService.getDynamicContent('conseil').subscribe(
      response => {
        this.dynamic = response.data;
      }, err => {
        console.log(err)
      });
  }
}
