import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {User} from '../../models/user.model';
import * as _ from 'underscore';
import {CommonService} from '../../services/common.service';
import {ContractAttachModel} from '../../models/contract-attach.model';
import {ServicesService} from '../../services/services.service';
import {UnpaidModel} from '../../models/unpaid.model';
import * as $ from 'jquery/dist/jquery.min.js';
import {Router} from '@angular/router';
import {DataService} from '../../../shared/services/data.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-unpaid',
  templateUrl: './unpaid-page.component.html',
  styleUrls: ['./unpaid-page.component.scss']
})
export class UnpaidPageComponent implements OnInit {
  contractsBills: Array<UnpaidModel> = [];
  selectedBills = {
    total: 0,
    invoices: []
  };

  unpaidBalance = 0;

  // total amount that customer should pay
  total: number;

  // total of all invoices
  totalUnpaid: number;

  // total of exigible bills (checked first)
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
    private dataService: DataService,
    private router: Router,
    private translate: TranslateService,
    private toastrService: ToastrService,
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
      if (this.clientContracts && this.clientContracts.length) {
        for (let i = 0; i < this.clientContracts.length; i++) {
          const contractNo = this.clientContracts[i].contractNo;
          this.services.getUnpaidBalanceByContractNo(contractNo).subscribe(res => {
            this.unpaidBalance = res.data;
            if (response && response.data) {
              if (res.data <= 0) {
                this.clientContracts.splice(i, 1);
              }
              _.each(this.clientContracts, (element: any) => {
                _.extend(element, {id: element.contractNo, itemName: `${element.contractNo} - (${element.typeNetwork})`});
              });
              if (this.selectedContract && this.clientContracts.length > 0) {
                this.selectedContract.push(this.clientContracts[0]);
              }
              this.getAllUnpaidBills();
            }
          }, err => {
          });
        }
        setTimeout(() => {

        }, 200);
        /*for (const value of this.clientContracts) {
          if (value.contractNo === localStorage.getItem('SELECTED_CONTRACT')) {
            this.selectedContract.push(value);
          }
        }*/

      }

    }, err => {
      console.log(err)
    });
  }

  getAllUnpaidBills() {
    this.selectedBills.invoices = [];
    this.total = 0.0;
    this.totalUnpaid = 0;
    const contracts = _.pluck(this.selectedContract, 'contractNo');
    this.contractServices.getPageableUnpaidBills(this.page, this.pageSize, contracts)
      .subscribe(response => {
        this.contractsBills = response.data['content'];
        _.each(this.contractsBills, (contract) => {
          if (contract.invoices) {
            _.each(contract.invoices, (invoice) => {
              if (invoice.exigible || invoice.balance <= 0) {
                this.addBill(contract, invoice, true);
              }
            });
          }
        });
        this.calcUnpaidBills();
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => {
      });

  }

  calcUnpaidBills(): void {
    this.totalUnpaid = 0;
    // this.total = 0;
    this.totalBillsExigible = 0;
    this.contractsBills.map((contract) => {
      contract.invoices.map((bill, index) => {
        this.totalUnpaid += parseFloat(bill.balance);
        // this.total += bill.exigible ? parseFloat(bill.balance) : 0;
        this.totalBillsExigible += bill.exigible ? parseFloat(bill.balance) : 0;
      })
    });
  }

  /*calcTotal(bill, balance, operation): void {
    if (operation === 'add') {
      if (!bill.exigible) {
        this.total += parseFloat(balance);
      }
    } else {
      this.total -= parseFloat(balance)
    }
  }*/

  toggleCheckAll($event, contractsBills) {
    if (contractsBills && contractsBills.length) {
      this.calcUnpaidBills();
      const operation = $event.currentTarget.checked ? 'add' : 'minus';
      this.checkboxes.forEach((element) => {
        if (element.nativeElement.getAttribute('data-type') !== 'true') {
          element.nativeElement.checked = $event.currentTarget.checked;
        }
      });
      contractsBills.forEach((contract) => {

        contract.invoices.forEach((bill) => {
          bill.checked = $event.currentTarget.checked;
          this.addBill(contract, bill, bill.checked);
          // this.calcTotal(bill, bill.balance, operation);

        });
      });
    }
  }

  toggleAddBills($event, contract, contractsBills) {
    if (contract && contract.invoices) {
      const operation = $event.currentTarget.checked ? 'add' : 'minus';
      contract.checked = $event.currentTarget.checked;
      let countCheckedContracts = 0;
      _.each(contractsBills, (cont) => {
        if (cont.checked) {
          countCheckedContracts++;
        }
      });
      if (countCheckedContracts < contractsBills.length) {
        $('#head').prop('indeterminate', true);
        $('#head').prop('checked', false);
      } else {
        $('#head').prop('indeterminate', false);
        $('#head').prop('checked', true);
      }
      if (countCheckedContracts === 0) {
        $('#head').prop('indeterminate', false);
        $('#head').prop('checked', false);
      }
      contract.invoices.forEach((bill) => {
        if (!bill.exigible) {
          // this.calcTotal(bill, bill.balance, operation);
          bill.checked = $event.currentTarget.checked;
        }
        this.addBill(contract, bill, bill.checked);
      });
    }
  }

  toggleAddBill($event, bill, contract) {
    const operation = $event.currentTarget.checked ? 'add' : 'minus';
    bill.checked = $event.currentTarget.checked;
    let countCheckedBills = 0;
    let countUnExigibleBills = 0;
    _.each(contract.invoices, (invoice) => {
      if (!invoice.exigible) {
        countUnExigibleBills++;
        if (invoice.checked) {
          countCheckedBills++;
        }
      }
    });
    if (countCheckedBills < countUnExigibleBills) {
      $('#head-' + contract.contactNo).prop('indeterminate', true);
      $('#head-' + contract.contactNo).prop('checked', false);
    } else {
      $('#head-' + contract.contactNo).prop('indeterminate', false);
      $('#head-' + contract.contactNo).prop('checked', true);
    }
    if (countCheckedBills === 0) {
      $('#head-' + contract.contactNo).prop('indeterminate', false);
      $('#head-' + contract.contactNo).prop('checked', false);
    }
    this.addBill(contract, bill, bill.checked);
    if (!bill.exigible) {
      // this.calcTotal(bill, parseFloat(bill.balance), operation);
    }
  }

  addBill(contract, bill, checked) {
    bill.contractNo = contract.contactNo;
    if (bill.exigible || checked) {
      // this.selectedBills.total += bill.balance;
      let exists = false;
      for (let i = 0; i < this.selectedBills.invoices.length; i++) {
        if (bill.invoiceNo === this.selectedBills.invoices[i].invoiceNo) {
          exists = true;
        }
      }
      if (!exists) {
        this.selectedBills.invoices.push(bill);
      }
    } else {
      // this.selectedBills.total -= bill.balance;
      this.selectedBills.invoices.splice(this.selectedBills.invoices.indexOf(bill), 1);
    }
    this.total = parseFloat((Math.round(this.getTotalAmount() * 100) / 100).toFixed(2));
  }

  private getTotalAmount() {
    console.log(this.selectedBills.invoices);
    return this.selectedBills.invoices
      .map(invoice => invoice.balance)
      .reduce((a, b) => {
        return parseFloat(a) + parseFloat(b);
      });
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

  submit() {
    if (this.totalUnpaid <= 0 || this.total <= 0) {
      this.toastrService.error(this.translate.instant('Le montant à règler doit être positif'), '');
      return;
    }
    if (this.selectedBills.invoices.length !== 0) {
      this.dataService.set('selectedBills', this.selectedBills);
      this.router.navigate(['/services/payment']);
    }
  }

  test() {
    const checkboxes = document.querySelectorAll('input.thing'),
      checkall = document.getElementById('checkall');

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i]['onclick'] = function () {
        const checkedCount = document.querySelectorAll('input.thing:checked').length;

        checkall['checked'] = checkedCount > 0;
        checkall['indeterminate'] = checkedCount > 0 && checkedCount < checkboxes.length;
      }
    }

    checkall.onclick = function () {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i]['checked'] = this['checked'];
      }
    }
  }

  test2() {
    $(document).on('change', 'input[type="checkbox"]', function (e) {

      const checked = $(this).prop('checked');
      const container = $(this).parent().parent();

      container.find('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      });

      function checkSiblings(el) {

        const parent = el.parent().parent().parent();
        let all = true;

        el.siblings().each(function () {
          return all = ($(this).children().find('input[type="checkbox"]').prop('checked') === checked);
        });

        if (all && checked) {
          parent.children('input[type="checkbox"]').prop({
            indeterminate: false,
            checked: checked
          });

          checkSiblings(parent);

        } else if (all && !checked) {
          parent.children().find('input[type="checkbox"]').prop('checked', checked);
          parent.children().find('input[type="checkbox"]').prop('indeterminate',
            (parent.find('input[type="checkbox"]:checked').length > 0));
          checkSiblings(parent);
        } else {
          el.parents('li').children('input[type="checkbox"]').prop({
            indeterminate: true,
            checked: false
          });

        }

      }

      checkSiblings(container);
    });
  }

  getUnpaidBalanceByContract(contractNo: string) {
    this.services.getUnpaidBalanceByContractNo(contractNo).subscribe(response => {
      this.unpaidBalance = response.data;
    }, err => {
      console.log(err)
    });
  }
}
