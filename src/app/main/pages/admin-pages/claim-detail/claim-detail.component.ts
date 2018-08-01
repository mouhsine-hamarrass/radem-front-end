import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WizardComponent} from 'angular-archwizard';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import _ = require('underscore');
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClaimDetailComponent implements OnInit {

  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('StepButton') StepButton: ElementRef;
  @ViewChild('UpdateButton') UpdateButton: ElementRef;
  @ViewChild('commentaire') commentaire: ElementRef;
  public commentForm: FormGroup;
  public claim: any;
  public impaye = 0;
  public requestUpdate: any;
  public modalRef: BsModalRef;
  public config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
constructor(private adminService: AdminService,
  private router: Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,
  private modalService: BsModalService) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  // CommentForm
  get comment() {
    return this.commentForm.get('comment');
  }


ngOnInit() {
  // const wizardState: WizardState = this.wizard.model;
  /*for (let stepIndex = 0; stepIndex < 4; stepIndex++) {
    console.log(this.wizard.model.navigationMode.goToNextStep);
  }

  const b: HTMLElement = this.button.nativeElement as HTMLElement;
  for (let stepIndex = 0; stepIndex < 2; stepIndex++) {
    b.click();
  }
  console.log(localStorage.getItem('user'));

  this.requestService.getAgents().subscribe( response => {
    this.agents = response.data;
    console.log(this.agents);
  })*/

  const id: string = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
   this.adminService.getClaim(id).subscribe(response => {
     this.claim = response.data;
     console.log(this.claim);
     this.claim.feedback.reverse();
  });
}
}

// Stepper
nextStep(id, choice?) {
 this.adminService.nextStepClaim(id, choice).subscribe(response => {
   this.claim = response.data;
   this.claim.feedback.reverse();
   if (this.claim.status === 'CLOSED') {
    this.StepButton.nativeElement.disabled = true;
      }
 }, err => console.log(err));
    this.ngOnInit();
}

// Add Comment
addComment() {
 this.claim.feedback.push({message: this.comment.value, sendingDate: new Date()});
 this.adminService.saveComplaint(this.claim).subscribe(response => {
  this.commentForm.reset();
  this.ngOnInit();
 },
 (err) => {
  });
}

focus() {
 this.commentaire.nativeElement.focus();
}

}
