import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WizardComponent} from 'angular-archwizard';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionDetailComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  public focus(): void {}

  public nextStep(): void {}

  public addComment(): void {}
}
