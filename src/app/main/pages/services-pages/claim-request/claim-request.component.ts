import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ServicesService} from '../../../services/services.service';

@Component({
  selector: 'app-claim-request',
  templateUrl: './claim-request.component.html',
  styleUrls: ['./claim-request.component.scss']
})
export class ClaimRequestComponent implements OnInit {

  protected complaintForm: FormGroup;

  constructor(private myServices: ServicesService,
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
    this.myServices.saveComplaint(complaint).subscribe(response => {
      this.toastrService.show('Reclamation ajoutée avec succes');
    });
  }
}
