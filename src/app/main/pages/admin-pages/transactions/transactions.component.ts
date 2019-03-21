import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {TransactionSummaryModel} from '../../../models/transactionSummary.model';
import {TerminationRequestStatus, TransStatusEnum} from '../../../../shared/models/user.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: any = [];
  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;
  private translate: TranslateService;
  statusTrx = Object.keys(TransStatusEnum);


  constructor(private adminService: AdminService,
              private toastrService: ToastrService,
  ) {

  }

  ngOnInit() {

    this.getTrans();
  }

  onSorted(sort: any): void {
    this.sort = sort;
    this.getTrans();
  }

  onFiltred(filter: any): void {
    this.filter = filter;
    this.getTrans();
  }

  getTrans() {
    this.adminService.getPageableListTransactions(this.page, this.pageSize, this.filter, this.sort).subscribe(response => {
      this.transactions = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getTrans();
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.getTrans();
  }


}
