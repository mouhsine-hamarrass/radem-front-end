import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ContractsService } from '../../../services/contracts.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-new-cancellation-request',
  templateUrl: './new-cancellation-request.component.html',
  styleUrls: ['./new-cancellation-request.component.scss']
})
export class NewCancellationRequestComponent implements OnInit {
  private req: any;
  protected cancellationForm = new FormGroup({
    firstAndLastName: new FormControl(''),
    cin: new FormControl(''),
    delivered: new FormControl(''),
    at: new FormControl(''),
    clientName: new FormControl(''),
    consumptionAdresse: new FormControl(''),
    correspondenceAdresse: new FormControl(''),
    landline: new FormControl(''),
    cellphone: new FormControl(''),
    function: new FormControl(''),
    placeOfWork: new FormControl(''),
    water: new FormControl(''),
    electricity: new FormControl(''),
    counterDropDate: new FormControl(''),
    waterPolice: new FormControl(''),
    electricityPolice: new FormControl(''),
    waterTourne: new FormControl(''),
    electricityTourne: new FormControl('')
  });
  protected subscriptions = [];

  constructor(private myServices: ServicesService,
              private contracts: ContractsService,
              private router: Router) { }

  ngOnInit() {
    this.myServices.getUser(1).subscribe(response => {
      this.cancellationForm.controls.clientName.setValue(response.data.lastname + ' ' + response.data.firstname);
      this.cancellationForm.controls.consumptionAdresse.setValue(response.data.address);
      this.cancellationForm.controls.cellphone.setValue(response.data.phone);
    });
    this.subscriptions = (JSON.parse(localStorage.getItem('user'))).subscriptions;
    console.log(this.subscriptions);
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

  save() {
    this.req = {
      requestNumber: Math.floor(Math.random() * 100000),
      counterDropDate: this.cancellationForm.controls.counterDropDate.value,
      subscriptions: [],
      applicantType: 'CLIENT',
      client: JSON.parse(localStorage.getItem('user'))
    };
    if (this.cancellationForm.controls.water.value) {
      this.req.subscriptions.push(this.cancellationForm.controls.waterPolice.value);
    }
    if (this.cancellationForm.controls.electricity.value) {
      this.req.subscriptions.push(this.cancellationForm.controls.electricityPolice.value);
    }
    this.myServices.saveTerminationRequest(this.req).subscribe(response => {
      console.log(response);
      this.print();
      this.router.navigate(['/services/cancellation-requests'])
    }, err => {});
    console.log(this.req);
  }

  waterSubscriptions(): any[] {
    return this.subscriptions.filter(subscription => subscription.type === 'Eau');
  }

  electricitySubscriptions(): any[] {
    return this.subscriptions.filter(subscription => subscription.type === 'Electricite');
  }
}
