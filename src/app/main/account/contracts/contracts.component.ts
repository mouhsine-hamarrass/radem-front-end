import {Component, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private modalService: BsModalService) { }

  openContractDetail(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  openBillDetail(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config)
  }

  ngOnInit() {
  }

}
