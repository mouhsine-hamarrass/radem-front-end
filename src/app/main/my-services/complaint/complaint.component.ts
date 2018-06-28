import { Component, OnInit } from '@angular/core';
import {MyServicesService} from '../../core/services/my-services.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  protected complaintForm: FormGroup;

  constructor(private myServicesService: MyServicesService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.complaintForm = this.formBuilder.group({
      numero: [],
      objet: [],
      description: []
    });
  }

  get numero() {
    return this.complaintForm.controls.numero.value;
  }

  get objet() {
    return this.complaintForm.controls.objet.value;
  }

  get description() {
    return this.complaintForm.controls.description.value;
  }

  ngOnInit() {
  }

  save(): void {
    const complaint = {
      claimNumber: this.numero,
      object: this.objet,
      description: this.description
    };
    console.log(complaint);
    this.myServicesService.saveComplaint(complaint).subscribe(response => {
      this.toastrService.show('Reclamation ajoutée avec succes');
    });
  }

}
