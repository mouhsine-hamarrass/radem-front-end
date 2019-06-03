import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {CancellationRequestModel} from '../../../models/cancellation-request.model';
import {AdminService} from '../../../services/admin.service';
import {Setting} from '../../../models/setting.model';

@Component({
    selector: 'app-cancellation-requests',
    templateUrl: './cancellation-requests.component.html',
    styleUrls: ['./cancellation-requests.component.scss']
})
export class CancellationRequestsComponent implements OnInit {
  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;
  cancellationtionRequests: Array<any>;
  clientContracts: Array<ContractAttachModel>;
  contractNo: string;
  selectedContract: string;
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
      if (this.clientContracts.length) {
        this.selectedContract = this.clientContracts[0].contractNo;
        this.setContract(this.clientContracts[0].contractNo);
      }
    }, err => {
      console.log(err)
    });
  }

  getTerminations(contractNo: string): void {
    this.services.getTerminationRequests(contractNo, this.page, this.pageSize)
      .subscribe(response => {
        this.cancellationtionRequests = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => {
      });
  }


  setContract(contractNo: string) {
    this.contractNo = contractNo;
    this.getTerminations(this.contractNo);
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getTerminations(this.contractNo);

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



















//     cancellationRequests: Array<any> = [];
//     page = 1;
//     pageSize = 0;
//     totalElements: number;
//     totalPages: number;
//     numberOfItems: number;
//     itemsPerPage: number;
//     sort: any;
//     filter: any;
//     statusFilter = Object.keys(Statut);
//
//     constructor(
//         private myServices: ServicesService
//     ) {
//     }
//
//     ngOnInit() {
//         this.getTerminationRequests();
//     }
//
//     onSorted(sort: any): void {
//         this.sort = sort;
//         this.getTerminationRequests();
//     }
//
//     onFiltred(filter: any): void {
//         this.filter = filter;
//         this.getTerminationRequests();
//     }
//
//     getTerminationRequests() {
//         this.myServices.getPageableTerminationRequests(this.page, this.pageSize, this.filter, this.sort)
//             .subscribe(response => {
//                 this.cancellationRequests = response.data.content;
//                 this.totalElements = response.data.totalElements;
//                 this.totalPages = response.data.totalPages;
//                 this.itemsPerPage = response.data.size;
//                 this.numberOfItems = response.data.numberOfElements;
//             }, err => {
//             });
//     }
//
//
//     pageChanged(page: number): void {
//         this.page = page;
//         this.getTerminationRequests();
//     }
//
//     pageFilter(pageSize: number): void {
//         this.pageSize = pageSize;
//         this.itemsPerPage = pageSize;
//         this.page = 1;
//         this.getTerminationRequests();
//     }
