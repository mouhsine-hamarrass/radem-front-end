import { Component, OnInit, TemplateRef } from '@angular/core';
import { ContractsService } from '../../../services/contracts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  protected solde: any;
  protected subscriptions;
  protected subscription;
  protected bills;
  protected bill;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private modalService: BsModalService,
    private contractsServices: ContractsService, private soldeService: AdminService) {
  }

  ngOnInit() {
    this.contractsServices.getSubscriptions().subscribe(response => this.subscriptions = response, err => { });
    this.soldeService.getSoldeCrediteur().subscribe(response => {
      this.solde = response;
      console.log(response);
    })
  }

  openDetailSubscription(template: TemplateRef<any>, subscriptionId: number) {
    this.contractsServices.getSubscription(subscriptionId).subscribe(response => {
      this.modalRef = this.modalService.show(template, this.config);
      this.subscription = response;
    });
  }

  showBills(police: string): void {
    this.contractsServices.getBills(police).subscribe(response => {
      console.log(response);
      this.bills = response; }, err => { });
  }

  openBillDetail(template: TemplateRef<any>, numBill: string) {
    this.contractsServices.getBill(numBill).subscribe(response => {
      console.log(this.bill);
      this.modalRef = this.modalService.show(template, this.config);
      this.bill = response[0];
    });
  }

}
