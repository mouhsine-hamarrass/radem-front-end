import {Component, OnInit} from '@angular/core';
import {AlertTypeModel} from '../../../models/alert-type.model';
import {UtilsService} from '../../../services/utils.service';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-alert-type',
  templateUrl: './alert-type.component.html',
  styleUrls: ['./alert-type.component.scss']
})
export class AlertTypeComponent implements OnInit {
  protected alertType: AlertTypeModel = {};
  protected formAlertType;
  protected FormGroup;
  protected isSubmitted = false;

  constructor(private utilsService: UtilsService,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.formAlertType = this.formBuilder.group({
      title: ['', Validators.required],
      message: []
    });
  }

  get title() {
    return this.formAlertType.get('title');
  }

  get message() {
    return this.formAlertType.get('message');
  }

  ngOnInit() {
    this.getAlertType();
  }

  getAlertType() {
    const alertTypeId: string = this.route.snapshot.paramMap.get('id');
    if (alertTypeId !== null) {
      this.adminService.getAlertType(alertTypeId).subscribe(response => {
        this.alertType = response.data;
        this.loadAlertType();
      });
    }
  }

  loadAlertType() {
    this.title.setValue(this.alertType.title);
    this.message.setValue(this.alertType.message);
  }

  createAlertType() {
    this.isSubmitted = true;
    this.alertType.title = this.formAlertType.controls.title.value;
    this.alertType.message = this.formAlertType.controls.message.value;

    this.adminService.createAlertType(this.alertType).subscribe(response => {
      this.toastrService.success('Type d\'alerte ajouté', '', {
        timeOut: 2000,
      });
    }, err => {
    });
  }

  saveAlertType() {
    this.isSubmitted = true;
    this.alertType.title = this.formAlertType.controls.title.value;
    this.alertType.message = this.formAlertType.controls.message.value;

    this.adminService.saveAlertType(this.alertType.id, this.alertType).subscribe(response => {
      this.toastrService.success('Type d\'alerte modifié', '', {
        timeOut: 2000,
      });
    }, err => {
    });
  }
}
