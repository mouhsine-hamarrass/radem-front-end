import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consumption-page',
  templateUrl: './consumption-page.component.html',
  styleUrls: ['./consumption-page.component.scss']
})
export class ConsumptionPageComponent implements OnInit {
  protected contracts: any;
  protected minMaxForm: FormGroup;
  protected historyForm: FormGroup;
  protected releves: any;
  protected nextReleve: any;
  protected contractNumber: any;
  protected Consumptions: any;
  protected minMax: any;
  protected meters: any;

  constructor(private adminService: AdminService,
    private formBuilder: FormBuilder) {
      this.minMaxForm = this.formBuilder.group({
        contract: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      });
      this.historyForm = this.formBuilder.group({
        contract: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.adminService.getContracts().subscribe(response => {
      this.contracts = response;
    })

    this.adminService.getReleves().subscribe(response => {
      this.releves = response;
    })

    this.adminService.getNextReleve().subscribe(response => {
      this.nextReleve = response;
    })

    this.adminService.getCompteur().subscribe(response => {
      this.meters = response;
    })
  }

  getConsumptionHistory() {
    this.adminService.getConsumptions(this.contractNumber).subscribe(response => {
      this.Consumptions = response;
    })
  }

  getMinMax(contractNumber: any) {
    console.log(contractNumber);
    this.adminService.getMinMaxConsumption(contractNumber).subscribe(response => {
      this.minMax = response;
      console.log(this.minMax);
    })
  }

  setContract(contractNumber: any) {
    this.contractNumber = contractNumber;
  }

}
