import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  EventEmitter,
  Inject,
  AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WizardComponent, WizardState } from 'angular-archwizard';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import _ = require('underscore');
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClaimDetailComponent implements OnInit, AfterViewInit {
  @ViewChild(WizardComponent) public wizard: WizardComponent;
  @ViewChild('StepButton') StepButton: ElementRef;
  @ViewChild('UpdateButton') UpdateButton: ElementRef;
  @ViewChild('commentaire') commentaire: ElementRef;
  public commentForm: FormGroup;
  public claim: any;
  public impaye = 0;
  public isEmpty = true;
  public selectedStep: number;
  public requestUpdate: any;
  public modalRef: BsModalRef;
  private wizardState: WizardState;
  public config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  // CommentForm
  get comment() {
    return this.commentForm.get('comment');
  }

  ngAfterViewInit() {
    switch (this.claim.status) {
      case 'CREATED':
      this.selectedStep = 0;
        break;
      case 'SUPPORTED':
      this.selectedStep = 1;
        break;
      case 'ANALYSIS':
      this.selectedStep = 2;
        break;
        case 'REQUEST_COMPLEMENT':
        this.selectedStep = 3;
        break;
        case 'TRANSMISSION_OF_INFORMATION':
        this.selectedStep = 4;
        break;
        case 'REPLY_PROVIDED':
        this.selectedStep = 5;
        break;
        case 'CLOSED':
        this.selectedStep = 6;
        break;
    }
    this.wizardState = this.wizard.model;
    this.wizardState.navigationMode.goToStep(
      this.selectedStep,
      new EventEmitter(),
      new EventEmitter()
    );
  }
  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adminService.getClaim(id).subscribe(response => {
        this.claim = response.data;
        console.log(this.claim);
      });
    }
  }

  // Stepper
  nextStep(id, choice?) {
    this.adminService.nextStepClaim(id, choice).subscribe(
      response => {
        this.claim = response.data;
        if (this.claim.status === 'CLOSED') {
          this.StepButton.nativeElement.disabled = true;
        }
      },
      err => console.log(err)
    );
    this.ngOnInit();
  }

  // Add Comment
  addComment() {
    this.claim.feedback.push({
      message: this.comment.value,
      sendingDate: new Date()
    });
    this.adminService.saveComplaint(this.claim).subscribe(
      response => {
        this.commentForm.reset();
        this.ngOnInit();
      },
      err => {}
    );
  }

  focus() {
    this.commentaire.nativeElement.focus();
  }

  validate(value: String) {
    if (value !== '') {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
}
