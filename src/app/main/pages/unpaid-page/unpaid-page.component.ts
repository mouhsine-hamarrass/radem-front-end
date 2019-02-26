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
import {InvoiceInfosModel} from '../../models/invoice-infos.model';

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
    private dataService: DataService,
    private router: Router,
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

    // this.test2();
    /*
    this.contractsBills = [
      {
        id: 1,
        contactNo: '76457167612',
        addressConsumption: '15 rue 12 lots annour casa',
        typeNetwork: 'Water',
        invoices: [
          {
            id: 1,
            balance: 450,
            exigible: false,
            amount: 300,
            invoiceNo: '13214141',
            month: 10,
            year: 2018
          },
          {
            id: 2,
            balance: 500,
            exigible: false,
            amount: 200,
            invoiceNo: '843908903',
            month: 8,
            year: 2018
          },
          {
            id: 3,
            balance: 400,
            exigible: false,
            amount: 200,
            invoiceNo: '489085903',
            month: 5,
            year: 2018
          },
          {
            id: 4,
            balance: 800,
            exigible: false,
            amount: 120,
            invoiceNo: '3208490',
            month: 3,
            year: 2018
          }
        ]
      },
      {
        id: 2,
        contactNo: '0859484',
        addressConsumption: '15 rue 12 lots annour casa',
        typeNetwork: 'Water',
        invoices: [
          {
            id: 1,
            balance: 430,
            exigible: false,
            amount: 300,
            invoiceNo: '549044',
            month: 11,
            year: 2018
          },
          {
            id: 2,
            balance: 500,
            exigible: true,
            amount: 200,
            invoiceNo: '43664643',
            month: 8,
            year: 2018
          },
          {
            id: 3,
            balance: 549,
            exigible: true,
            amount: 200,
            invoiceNo: '5353433',
            month: 9,
            year: 2018
          },
          {
            id: 4,
            balance: 535,
            exigible: false,
            amount: 120,
            invoiceNo: '534634',
            month: 4,
            year: 2017
          }
        ]
      }
    ]
    */
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
  }

  calcTotal(bill, balance, operation): void {
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
        }
      });
      contractsBills.forEach((contract) => {
        contract.invoices.forEach((bill) => {
          bill.checked = $event.currentTarget.checked;
          this.addBill(contract, bill, bill.checked);
          if (operation === 'add') {
            bill.contractNo = contract.contractNo;
            this.calcTotal(bill, bill.balance, operation);
          }
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
          this.calcTotal(bill, bill.balance, operation);
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
      this.calcTotal(bill, parseFloat(bill.balance), operation);
    }
  }

  addBill(contract, bill, checked) {
    bill.contractNo = contract.contactNo;
    if (bill.exigible || checked) {
      this.selectedBills.total += bill.balance;
      this.selectedBills.invoices.push(bill)
    } else {
      this.selectedBills.total -= bill.balance;
      this.selectedBills.invoices.splice(this.selectedBills.invoices.indexOf(bill), 1);
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

  submit() {
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

}
