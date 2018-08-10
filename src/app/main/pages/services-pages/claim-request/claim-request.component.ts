import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ServicesService} from '../../../services/services.service';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-claim-request',
  templateUrl: './claim-request.component.html',
  styleUrls: ['./claim-request.component.scss']
})
export class ClaimRequestComponent implements OnInit {

  protected complaintForm: FormGroup;
  protected reqNumber: number;
  protected objects: any;

  constructor(private myServices: ServicesService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private translate: TranslateService,
              private router: Router) {
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
   this.reqNumber =  Math.floor(Math.random() * 100000);
   this.myServices.getObjects().subscribe(response => this.objects = response.data, err => {});
   console.log(JSON.parse(localStorage.getItem('user')));
  }

  save(): void {
    const complaint = {
      claimNumber: this.reqNumber,
      object: this.objet,
      description: this.description,
      complainer: JSON.parse(localStorage.getItem('user'))
    };
    console.log(complaint);
    this.myServices.saveComplaint(complaint).subscribe(response => {
      this.toastrService.show('Reclamation ajoutée avec succes');
      this.router.navigate(['/services/claim-requests'])
    }, err => {});
  }
}
