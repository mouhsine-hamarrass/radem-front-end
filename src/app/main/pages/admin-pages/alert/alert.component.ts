import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  protected alertForm: FormGroup;
  protected alertTypes: any;
  protected alert: any;
  protected contracts: any;
  protected user: any;
  protected alertNotification: any;
  protected listContract: any;
  protected myData: any;
  protected mySource = [];

  constructor(private adminService: AdminService, private formBuilder: FormBuilder,
    private router: Router) {
    this.alertForm = this.formBuilder.group({
    type: ['', Validators.required],
    description: ['', Validators.required],
    contract: ['', Validators.required],
    client: ['']
  })}

  get type() {
    return this.alertForm.get('type');
  }
  get description() {
    return this.alertForm.get('description');
  }
  get contract() {
    return this.alertForm.get('contract');
  }
  get client() {
    return this.alertForm.get('client');
  }

  ngOnInit() {
    this.adminService.getAlertTypes().subscribe(response => {
      this.alertTypes = response.data;
    })
    this.adminService.getUsers().subscribe(response => {
      this.contracts = response;
    })
    this.adminService.getAllContracts().subscribe(response => {
      _.each(response, rep => this.mySource.push(rep.contrat));
    })
  }

  setAlert(id: any) {
    this.adminService.getAlert(id).subscribe(response => {
      this.alert = response.data;
      this.alertForm.controls.description.setValue(this.alert.description);
    })
  }

  setClient(contractNumber: any) {
    this.adminService.getUserWithContract(contractNumber).subscribe(response => {
      this.user = response;
      this.alertForm.controls.client.setValue(this.user[0].fullName);
    })
  }

  saveNotificationAlert() {
    this.alertNotification = {
      subscription : {
        subscription : this.user[0].contract,
        tournee : 'tournee',
        type : 'eau'
      },
      alert : {
        id : this.alert.id
      },
      client : {
          firstname : this.user[0].firstName,
          lastname : this.user[0].lastName,
          email : this.user[0].email,
          username : this.user[0].fullName,
        }
    }
    this.adminService.saveAlertNotification(this.alertNotification).subscribe(response => {
    });
    this.router.navigate(['/admin/alerts']);
  }
}
