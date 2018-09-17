import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ServiceModel} from '../../../models/service.model';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  serviceForm: FormGroup;

  service: ServiceModel;

  @Input() modalRef: BsModalRef;

  @Input() serviceId: number;

  @Output() refreshData = new EventEmitter<boolean>();

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private toastrService: ToastrService) {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    })
  }

  ngOnInit() {
    if (this.serviceId) {
      this.adminService.getService(this.serviceId).subscribe(response => {
        this.service = response.data;
        this.serviceForm.controls.name.setValue(this.service.name);
        this.serviceForm.controls.description.setValue(this.service.description);
      });
    }
  }

  get description() {
    return this.serviceForm.controls.description;
  }

  get name() {
    return this.serviceForm.controls.name;
  }

  saveService() {
    this.service = new ServiceModel(this.serviceId, this.name.value, this.description.value);

    this.adminService.saveService(this.serviceId, this.service).subscribe(response => {
      this.toastrService.success('L\'opération d\'ajout réussite', '');
      this.refreshData.emit(true);
      this.modalRef.hide();
    }, err => {
      this.refreshData.emit(false);
    });
  }

  createService() {
    this.service = new ServiceModel(this.serviceId, this.name.value, this.description.value);

    this.adminService.createService(this.service).subscribe(response => {
      this.toastrService.success('L\'opération de modification réussite', '');
      this.refreshData.emit(true);
      this.modalRef.hide();
    }, err => {
      this.refreshData.emit(false);
    });
  }
}
