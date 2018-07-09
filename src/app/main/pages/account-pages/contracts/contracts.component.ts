import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  public chartType = 'bar';
  // public chartConsoTitle = 'Moyenne des 12 dernier mois';
  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];
  public chartDatasets: Array<any> = [
    {data: [65, 59, 80, 81, 56, 70, 40, 30, 20, 15, 68], label: '2017'},
    {data: [28, 48, 40, 19, 86, 27, 90, 60, 25, 15, 80], label: '2018'}
  ];
  public chartOptions: any = {
    title: {
      text: 'Moyenne de consomation (2017-2018)',
      display: true,
    },
    responsive: true
  };
  private firstYbar: Color = {
    backgroundColor: 'rgba(151,187,205, 1)',
    borderWidth: 1,
    borderColor: 'rgba(151,187,205,1)',
    pointBackgroundColor: 'rgba(151,187,205,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(220,220,220,1)'
  };
  private secondYbar: Color = {
    backgroundColor: 'rgba(180, 228, 250, 1)',
    borderWidth: 1,
    borderColor: 'rgba(180, 228, 250,1)',
    pointBackgroundColor: 'rgba(180, 228, 250,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(151,187,205,1)'
  };
  public chartColors: Array<any> = [
    this.firstYbar,
    this.secondYbar
  ];
  modalRef: BsModalRef;

  private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};

  constructor(private modalService: BsModalService) {
  }

  openContractDetail(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  openBillDetail(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  openHistory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {

  }

  ngOnInit(): void {
  }
}
