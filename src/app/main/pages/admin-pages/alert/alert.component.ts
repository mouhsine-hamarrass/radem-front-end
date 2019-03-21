import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsService} from '../../../services/utils.service';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AlertModel} from '../../../models/alert.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alert: AlertModel;
  formAlert;
  FormGroup;
  isSubmitted = false;

  @Input() modalRef: BsModalRef;

  @Input() alertId: number;

  @Output() refreshAlerts = new EventEmitter<boolean>();

  constructor(private utilsService: UtilsService,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.formAlert = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  get title() {
    return this.formAlert.get('title');
  }

  get instructions() {
    return this.formAlert.get('instructions');
  }

  get type() {
    return this.formAlert.get('type');
  }
  ngOnInit() {
    this.getAlert();
  }

  getAlert() {
    if (this.alertId !== null) {
      this.adminService.getAlert(this.alertId).subscribe(response => {
        this.alert = response.data;
        this.loadAlert();
      });
    }
  }

  loadAlert() {
    this.title.setValue(this.alert.title);
    this.type.setValue(this.alert.type);
    this.instructions.setValue(this.alert.instructions);
  }

  createAlert() {

    this.isSubmitted = true;
    this.alert = new AlertModel(
      null,
      this.formAlert.controls.title.value,
      this.formAlert.controls.type.value,
      this.formAlert.controls.instructions.value
    );

    this.adminService.createAlert(this.alert).subscribe(response => {
      this.toastrService.success(this.translate.instant('ADDED_ALERT'), '');
      this.modalRef.hide();
      this.refreshAlerts.emit(true);
    }, err => {
      this.refreshAlerts.emit(false);
    });

  }

  saveAlert() {

    this.isSubmitted = true;
    this.alert = new AlertModel(
      this.alertId,
      this.formAlert.controls.title.value,
      this.formAlert.controls.type.value,
      this.formAlert.controls.instructions.value
    );

    this.adminService.saveAlert(this.alert.id, this.alert).subscribe(response => {
      this.toastrService.success(this.translate.instant('MODIFIED_ALERT'), '');
      this.modalRef.hide();
      this.refreshAlerts.emit(true);
    }, err => {
      this.refreshAlerts.emit(false);
    });

  }
}
