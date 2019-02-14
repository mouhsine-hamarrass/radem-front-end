import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {User} from '../../models/user.model';
import * as _ from 'underscore';
import {CommonService} from '../../services/common.service';
import {ContractAttachModel} from '../../models/contract-attach.model';
import {ServicesService} from '../../services/services.service';
import {UnpaidModel} from '../../models/unpaid.model';

@Component({
  selector: 'app-unpaid',
  templateUrl: './unpaid-page.component.html',
  styleUrls: ['./unpaid-page.component.scss']
})
export class UnpaidPageComponent implements OnInit {
  contractsBills: Array<UnpaidModel> = [];
  selectedBills = [];
  total: number;
  totalUnpaid: number;

  totalBillsExigible = 0;

  user: User;
  clientContracts: Array<ContractAttachModel> = [];
  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;

  dropdownSettings: any = {};
  selectedContract: any = [];

  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  constructor(
    private contractServices: ContractsService,
    private commonService: CommonService,
    private services: ServicesService) {
    this.dropdownSettings = this.commonService.initMultiSelect('Filtrer les contrats', true, '', 1);
    this.total = 0;
    this.totalUnpaid = 0;

    this.calcUnpaidBills();
  }

  ngOnInit() {
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }
    this.getClientAttachedContracts();
  }

  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
      _.each(this.clientContracts, (element: any) => {
        _.extend(element, {id: element.contractNo, itemName: `${element.contractNo} - (${element.typeNetwork})`});
      });
    }, err => {
      console.log(err)
    });
  }

  getAllUnpaidBills() {
    this.total = 0;
    this.totalUnpaid = 0;
    const contracts = _.pluck(this.selectedContract, 'id');
    this.contractServices.getPageableUnpaidBills(this.page, this.pageSize, contracts)
      .subscribe(response => {
        this.contractsBills = response.data['content'];
        this.calcUnpaidBills();
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
        console.log(this.contractsBills);
      }, err => {
      });
  }

  calcUnpaidBills(): void {
    this.totalUnpaid = 0;
    this.total = 0;
    this.totalBillsExigible = 0;
    this.contractsBills.map((contract) => {
      contract.invoices.map((bill, index) => {
        this.totalUnpaid += bill.balance;
        this.total += bill.exigible ? bill.balance : 0;
        this.totalBillsExigible += bill.exigible ? bill.balance : 0;
      })
    });
    /*
    this.checkboxes.forEach((element) => {
        if (element.nativeElement.getAttribute('data-type') === 'true') {
            element.nativeElement.indeterminate = true
        }
    });
    */
  }

  calcTotal(balance, operation): void {
    if (operation === 'add') {
      this.total += parseFloat(balance)
    } else {
      this.total -= parseFloat(balance)
    }
  }

  toggleCheckAll($event, contractsBills) {
    if (contractsBills && contractsBills.length) {
      this.calcUnpaidBills();
      const operation = $event.currentTarget.checked ? 'add' : 'minus';
      this.checkboxes.forEach((element) => {
        if (element.nativeElement.getAttribute('data-type') !== 'true') {
          element.nativeElement.checked = $event.currentTarget.checked;
          if (operation === 'add') {
            const total = element.nativeElement.getAttribute('data-value');
            if (total) {
              this.calcTotal(total, operation);
            }
          }
        }
      });
      contractsBills.forEach((contract) => {
        contract.invoices.forEach((bill) => {
          bill.checked = $event.currentTarget.checked
        });
      });
    }
  }

  toggleAddBills($event, contract) {
    if (contract && contract.invoices) {
      const operation = $event.currentTarget.checked ? 'add' : 'minus';
      contract.invoices.forEach((bill) => {
        if (!bill.exigible) {
          if (bill.checked) {
            if (operation === 'minus') {
              this.calcTotal(bill.balance, operation);
            }
          } else {
            if (operation === 'add') {
              this.calcTotal(bill.balance, operation);
            }
          }
          bill.checked = $event.currentTarget.checked;
        }
      });
    }
  }

  toggleAddBill($event, bill, parentSelector) {
    const operation = $event.currentTarget.checked ? 'add' : 'minus';
    // $('#head-' + parentSelector).prop('indeterminate', true);
    bill.checked = $event.currentTarget.checked;
    if (!bill.isExigible) {
      this.calcTotal(parseFloat(bill.balance), operation);
    }
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getAllUnpaidBills();
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.getAllUnpaidBills();
  }

  addBill(event, bill: any): void {
    if (event.target.checked) {
      this.total += parseFloat(bill.balance);
      this.selectedBills.push(bill);
    } else {
      this.total -= parseFloat(bill.balance);
      this.selectedBills.splice(this.selectedBills.indexOf(bill), 1);
    }
  }

  submit() {
    if (this.selectedBills.length !== 0) {
    }
  }

  cancel() {
    this.total = 0;
    this.selectedBills = [];
  }

}
