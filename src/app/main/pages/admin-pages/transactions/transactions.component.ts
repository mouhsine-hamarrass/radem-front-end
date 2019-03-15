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

/*
  dropTrans(idTransaction: number) {
    swal({
      title: this.translate.instant('ARE_YOU_SURE'),
      text: this.translate.instant('THIS_ACTION_IS_IRREVERSIBLE'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.translate.instant('CANCEL'),
      confirmButtonText: this.translate.instant('YES_DELETE')
    }).then((result) => {
      if (result.value) {
        if (this.transactions.find(transaction => transaction.id === idTransaction).users === 0) {
          this.adminService.dropTrans(idTransaction).subscribe(response => {
            this.transactions.splice(this.transactions.indexOf(this.transactions.find(transaction => transaction.id === idTransaction)), 1);
            this.toastrService.success(this.translate.instant('THE_TRANSACT_HAS_BEEN_DELETED'), this.translate.instant('DELETE_!'));
          });
        } else {
          this.toastrService.error(this.translate.instant('THE_TRANSACT_CAN_NOT_BE_DELETED"'), this.translate.instant('PREVIOUSLY_USED_TRANSACT'));
        }
      }
    });
  }*/
}
