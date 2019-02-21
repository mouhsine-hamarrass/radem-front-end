import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';
import {ContractsService} from '../../../services/contracts.service';
import {Router} from '@angular/router';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-new-cancellation-request',
  templateUrl: './new-cancellation-request.component.html',
  styleUrls: ['./new-cancellation-request.component.scss']
})
export class NewCancellationRequestComponent implements OnInit {
  user: User;
  req: any;
  subscriptions = [];
  cancellationForm: FormGroup;
  clientContracts: Array<ContractAttachModel>;
  today: any = moment();

  constructor(
    private services: ServicesService,
    private contracts: ContractsService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.cancellationForm = this.formBuilder.group({
      'firstAndLastName': ['', Validators.compose(
        [
          Validators.required
        ])],
      'cin': ['', Validators.compose(
        [
          Validators.required
        ])],
      'delivered': [this.today, Validators.compose(
        [
          Validators.required
        ])],
      'at': [this.today, Validators.compose(
        [
          Validators.required
        ])],
      'clientName': ['', Validators.compose(
        [
          Validators.required
        ])],
      'consumptionAdresse': ['', Validators.compose(
        [
          Validators.required
        ])],
      'correspondenceAdresse': [''],
      'landline': [''],
      'cellphone': ['', Validators.compose(
        [
          Validators.required
        ])],
      'function': [''],
      'placeOfWork': [''],
      'counterDropDate': [this.today, Validators.compose(
        [
          Validators.required
        ])],
      'policeType': ['WATER'],
      'waterPolice': ['', Validators.compose(
        [
          Validators.required
        ])],
      'electricityPolice': [''],
      'typeDemandeur': ['client'],
      'waterTourne': [null],
      'electricityTourne': [null],
    });
  }

  ngOnInit() {
    this.getClientAttachedContracts();
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }
    this.services.getUser(this.user.id).subscribe(response => {
      this.cancellationForm.controls['clientName'].setValue(response.data.lastname + ' ' + response.data.firstname);
      this.cancellationForm.controls['consumptionAdresse'].setValue(response.data.address);
      this.cancellationForm.controls['cellphone'].setValue(response.data.phone);
    });
    this.subscriptions = (JSON.parse(localStorage.getItem('user'))).subscriptions;
    console.log(this.subscriptions);
  }

  switchContractType(type) {
    if (type) {
      if (type === 'WATER') {
        this.cancellationForm.controls['waterPolice'].setValidators([Validators.required]);

        this.cancellationForm.controls['electricityPolice'].clearValidators();
        this.cancellationForm.controls['electricityPolice'].updateValueAndValidity();

      } else {
        this.cancellationForm.controls['electricityPolice'].setValidators([Validators.required]);

        this.cancellationForm.controls['waterPolice'].clearValidators();
        this.cancellationForm.controls['waterPolice'].updateValueAndValidity();
      }
    }
  }

  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
    }, err => {
      console.log(err)
    });
  }

  filterContract(filterType): ContractAttachModel[] {
    if (this.clientContracts) {
      return this.clientContracts.filter(i => i.typeNetwork === filterType);
    }
  }

  print() {
    let popupWin, __HEAD;
    __HEAD = document.querySelector('head').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>${__HEAD}
          <style>
          .card {
            border-radius: 0;
          }
          fieldset.scheduler-border {
            border: 1px groove #ddd !important;
            padding: 0 1.4em 1.4em 1.4em !important;
            margin: 0 0 1.5em 0 !important;
            -webkit-box-shadow:  0px 0px 0px 0px #000;
                    box-shadow:  0px 0px 0px 0px #000;
            font-weight: normal !important;
          }

          legend.scheduler-border {
            font-size: 1.2em !important;
            font-weight: bold !important;
            text-align: left !important;
          }

          .scheduler-border::after {
            border: 0;
          }

          .ups {
            border: 1px groove #ddd !important;
            margin-top: 15px;
            padding-top: 15px;
          }

          .marginLeft {
            margin-left: 45px;
          }

          .marginVisa {
            margin-left: 100px;
          }

          </style>
          </head>
          <body onload="window.print();window.close()"><div id="printSection" class="col col-md-12">
          <h2 class="text-center">RÉGIE AUTONOME DE DISTRIBUTION D'EAU ET D'ELECTRICITÉ MEKNÈS</h2>
          <h2 class="text-center">DIVISION CLIENTELE</h2>
          <h2 class="text-center">SERVICE COMMERCIAL</h2>
          <br>
          <h1 class="text-center font-weight-bold">DEMANDE DE RÉSILIATION</h1>
          <br>
          <div class="row col-md-10">
            <p>DR N° ${this.req.requestNumber}</p>
          </div>
          <fieldset class="scheduler-border">
            <legend class="scheduler-border">Demandeur</legend>
            <div class="row">
              <div class="col col-md-12">
                Nom et Prénom: ${this.cancellationForm.controls.firstAndLastName.value}
              </div>
            </div>
            <div class="row">
              <div class="col col-md-4">
                CIN N°: ${this.cancellationForm.controls.cin.value}
              </div>

              <div class="col col-md-4">
                Délivrée le: ${this.cancellationForm.controls.delivered.value}
              </div>

              <div class="col col-md-4">
                à: ${this.cancellationForm.controls.at.value}
              </div>
            </div>
            <div class="row marginLeft">
              <div class="col col-md-12">
              <i class="fa fa-check-square"></i> Client
              </div>
            </div>
            <div class="row marginLeft">
              <div class="col col-md-12">
                <input type="checkbox"> Procuration
              </div>
            </div>
            <div class="row marginLeft">
              <div class="col col-md-6">
                <input type="checkbox"> Lettre N°
              </div>
              <div class="col col-md-6">
                du
              </div>
            </div>
            <div class="row marginLeft">
              <div class="col col-md-12">
                <input type="checkbox"> Succession
              </div>
            </div>
          </fieldset>
          <fieldset class="scheduler-border">
            <legend class="scheduler-border">Polices d'abonnement</legend>
            <div class="row">
              <div class="col col-md-12">
                ${this.cancellationForm.controls.water.value ? '<i class="fa fa-check-square"></i>' : '<input type="checkbox" >'} EAU
              </div>
            </div>
            <div class="row marginLeft">
              <div class="col col-md-6">
                Police: ${this.cancellationForm.controls.waterPolice.value}
              </div>

              <div class="col col-md-6">
                Tournée: ${this.cancellationForm.controls.waterTourne.value}
              </div>
            </div>
            <div class="row">
              <div class="col col-md-12">
              ${this.cancellationForm.controls.electricity.value ? '<i class="fa fa-check-square"></i>' : '<input type="checkbox" >'}
              ELECTRICITE
              </div>
            </div>
            <div class="row marginLeft">
              <div class="col col-md-6">
                Police: ${this.cancellationForm.controls.electricityPolice.value}
              </div>

              <div class="col col-md-6">
                Tournée: ${this.cancellationForm.controls.electricityTourne.value}
              </div>
            </div>
          </fieldset>
          <fieldset class="scheduler-border">
            <legend class="scheduler-border">Client</legend>
            <div class="row">
              <div class="col col-md-12">
                Nom du client: ${this.cancellationForm.controls.clientName.value}
              </div>
            </div>
            <div class="row">
              <div class="col col-md-12">
                Adresse de consommation: ${this.cancellationForm.controls.consumptionAdresse.value}
              </div>
            </div>
            <div class="row">
              <div class="col col-md-6">
                N° Telephone fixe: ${this.cancellationForm.controls.landline.value}
              </div>

              <div class="col col-md-6">
                Portable: ${this.cancellationForm.controls.cellphone.value}
              </div>
            </div>
            <div class="row">
              <div class="col col-md-6">
                Fonction: ${this.cancellationForm.controls.function.value}
              </div>

              <div class="col col-md-6">
                lieu de travail: ${this.cancellationForm.controls.placeOfWork.value}
              </div>
            </div>
            <div class="row">
              <div class="col col-md-12">
                Adresse de correspondance: ${this.cancellationForm.controls.correspondenceAdresse.value}
              </div>
            </div>
          </fieldset>
          <div class="col col-md-12 ups">
            Date de dépose des compteurs souhaités: ${this.cancellationForm.controls.counterDropDate.value}
          </div>
          <br>
          <p>Fait le: ${moment().format('L')}</p>
          <br>
          <table class="col col-md-12">
            <tr>
              <td>
                Guichet de résiliation
                <br> AGENT RADEEM
                <br> Mle:
                <br>
                <p class="marginVisa">Visa:</p>
              </td>
              <td>signature</td>
            </tr>
          </table>
        </div>
        </body>
        </html>`
    );
    popupWin.document.close();
  }

  save(formData) {
      this.services.saveTerminationRequest(formData).subscribe(response => {
        // this.print();
        // this.router.navigate(['/services/cancellation-requests'])
      }, err => {
      });
  }

}
