import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, TemplateRef, EventEmitter, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WizardComponent, WizardState} from 'angular-archwizard';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import _ = require('underscore');
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cancellation-request',
  templateUrl: './cancellation-request.component.html',
  styleUrls: ['./cancellation-request.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancellationRequestComponent implements OnInit, AfterViewInit {
  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('StepButton') StepButton: ElementRef;
  @ViewChild('UpdateButton') UpdateButton: ElementRef;
  @ViewChild('commentaire') commentaire: ElementRef;
  public selectedStep: number;
  public requestForm: FormGroup;
  public commentForm: FormGroup;
  public addInterventionForm: FormGroup;
  public request: any;
  public impaye = 0;
  public requestUpdate: any;
  public modalRef: BsModalRef;
  private wizardState: WizardState;
  public config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  public agents = [{
    id: 1,
    firstname: 'younes',
    lastname: 'elansari',
    phone: '0633433443'
  }, {
    id: 2,
    firstname: 'Admin',
    lastname: 'AL ADMIN',
    phone: '0633334444'
  },
  {
    id: 3,
    firstname: 'Taha',
    lastname: 'Zahir',
    phone: '0612121212'
  }
];

  constructor(private requestService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService) {
      this.requestForm = this.formBuilder.group({
        agent: ['', Validators.required],
        dateIntervention: ['', Validators.required],
        phone: ['', Validators.required]
      });
      this.commentForm = this.formBuilder.group({
        comment: ['', Validators.required]
      });
      this.addInterventionForm = this.formBuilder.group({
        agent: ['', Validators.required],
        dateIntervention: ['', Validators.required],
        phone: ['', Validators.required]
      });
    }
    // RequestForm
    get agent() {
      return this.requestForm.get('agent');
    }
    get dateIntervention() {
      return this.requestForm.get('dateIntervention');
    }
    get phone() {
      return this.requestForm.get('phone');
    }
    // CommentForm
    get comment() {
      return this.commentForm.get('comment');
    }

    // InterventionForm
    get agentIntervention() {
      return this.addInterventionForm.get('agent');
    }
    get interventionDate() {
      return this.addInterventionForm.get('dateIntervention');
    }
    get phoneIntervenant() {
      return this.addInterventionForm.get('phone');
    }

    ngAfterViewInit() {
      switch (this.request.status) {
        case 'CREATED':
        this.selectedStep = 0;
          break;
        case 'RECEIVED':
        this.selectedStep = 1;
          break;
        case 'IN_PROGRESS':
        this.selectedStep = 2;
          break;
          case 'DEPOSITED_COUNTER':
          this.selectedStep = 3;
          break;
          case 'UNPAID_VERIFICATION':
          this.selectedStep = 4;
          break;
          case 'SETTLEMENT':
          this.selectedStep = 5;
          break;
          case 'CLOSED':
          this.selectedStep = 6;
          break;
      }
      this.wizardState = this.wizard.model;
      this.wizardState.navigationMode.goToStep(this.selectedStep, new EventEmitter(), new EventEmitter());
    }
  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
     this.requestService.getRequest(id).subscribe(response => {
       this.request = response.data;
       console.log(this.request);
       this.request.feedback.reverse();
       if (this.request.status === 'RECEIVED' || this.request.status === 'CREATED') {
         this.UpdateButton.nativeElement.disabled = true;
       } else {
        this.UpdateButton.nativeElement.disabled = false;
       }
    });
  }
  }

  // Choice of step + show Add Intervenant Popup
  AddIntervention(template: TemplateRef<any>) {
    if (this.request.status === 'UNPAID_VERIFICATION') {
      this.requestService.getSolde().subscribe(response => {
        this.impaye = response[0].impaye;
        this.nextStep(this.request.id);
      })
    } else if (this.request.status === 'RECEIVED') {
      this.modalRef = this.modalService.show(template, this.config);
    } else {
      this.nextStep(this.request.id);
    }
  }
  // Stepper
  nextStep(id) {
   this.requestService.nextStep(id, this.impaye).subscribe(response => {
     this.request = response.data;
     this.request.feedback.reverse();
     if (this.request.status === 'CLOSED') {
      this.StepButton.nativeElement.disabled = true;
        }
     });
     this.selectedStep = 5;
      this.ngOnInit();
  }

 // Add Comment
 addComment() {
   this.request.feedback.push({message: this.comment.value, sendingDate: new Date()});
   this.request.agent = JSON.parse(localStorage.getItem('user'));
   this.request.subscriptions = _.pluck(this.request.subscriptions, 'id');
   console.log(this.request);
   this.requestService.saveTerminationRequest(this.request).subscribe(response => {
    this.commentForm.reset();
    this.ngOnInit();
   },
   (err) => {
    });
 }

 // Add Intervenant Popup impl
 addIntervenant() {
   this.request.interventionDate = this.addInterventionForm.controls.dateIntervention.value;
   this.request.intervenant = {
     id:  Number.parseInt(this.addInterventionForm.controls.agent.value)
   }
   console.log(this.request);
   this.requestService.saveTerminationRequest(this.request).subscribe(response => {
     console.log(response);
     this.nextStep(this.request.id);
     this.ngOnInit();
   })
 }

 // Update Intervenant Popup impl
 updateIntervenant() {
  this.request.interventionDate = this.requestForm.controls.dateIntervention.value;
  this.request.intervenant = {
    id:  Number.parseInt(this.requestForm.controls.agent.value)
  }
  console.log(this.request);
  this.requestService.saveTerminationRequest(this.request).subscribe(response => {
    console.log(response);
    this.ngOnInit();
  })
}

openUpdateForm(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, this.config);
  this.requestForm.controls.agent.setValue(this.request.intervenant.id);
  this.requestForm.controls.dateIntervention.setValue(moment(this.request.interventionDate).format('YYYY-MM-DD'));
  this.requestForm.controls.phone.setValue(this.agents[this.request.intervenant.id - 1].phone);
}

 focus() {
   this.commentaire.nativeElement.focus();
}

getPhone(value: number) {
  console.log(value);
  value = value - 1;
  console.log(value);
  this.addInterventionForm.controls.phone.setValue(this.agents[value].phone);
  this.requestForm.controls.phone.setValue(this.agents[value].phone);
}

}
