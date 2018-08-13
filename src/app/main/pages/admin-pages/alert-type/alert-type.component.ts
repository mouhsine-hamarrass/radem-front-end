import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertTypeModel} from '../../../models/alert-type.model';
import {UtilsService} from '../../../services/utils.service';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-alert-type',
  templateUrl: './alert-type.component.html',
  styleUrls: ['./alert-type.component.scss']
})
export class AlertTypeComponent implements OnInit {
  alertType: AlertTypeModel = {};
  formAlertType;
  FormGroup;
  isSubmitted = false;

  @Input() modalRef: BsModalRef;

  @Input() alertTypeId: number;

  @Output() refreshAlertTypes = new EventEmitter<boolean>();

  constructor(private utilsService: UtilsService,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.formAlertType = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  get title() {
    return this.formAlertType.get('title');
  }

  ngOnInit() {
    this.getAlertType();
  }

  getAlertType() {
    if (this.alertTypeId !== null) {
      this.adminService.getAlertType(this.alertTypeId).subscribe(response => {
        this.alertType = response.data;
        this.loadAlertType();
      });
    }
  }

  loadAlertType() {
    this.title.setValue(this.alertType.title);
  }

  createAlertType() {
    this.isSubmitted = true;
    this.alertType.title = this.formAlertType.controls.title.value;

    this.adminService.createAlertType(this.alertType).subscribe(response => {
      this.toastrService.success('Type d\'alerte ajouté', '');
      this.refreshAlertTypes.emit(true);
    }, err => {
      this.refreshAlertTypes.emit(false);
    });
  }

  saveAlertType() {
    this.isSubmitted = true;
    this.alertType.title = this.formAlertType.controls.title.value;

    this.adminService.saveAlertType(this.alertType.id, this.alertType).subscribe(response => {
      this.toastrService.success('Type d\'alerte modifié', '');
      this.refreshAlertTypes.emit(true);
    }, err => {
      this.refreshAlertTypes.emit(false);
    });
  }
}
