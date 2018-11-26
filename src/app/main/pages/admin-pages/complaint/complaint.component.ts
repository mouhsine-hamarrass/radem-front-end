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
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {WizardComponent, WizardState} from 'angular-archwizard';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import swal from 'sweetalert2';
import {ClaimModel} from '../../../models/claim.model';
import {FeedbackModel} from '../../../models/feedback.model';
import {ComplaintService} from '../../../services/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit, AfterViewInit {
  @ViewChild(WizardComponent) public wizard: WizardComponent;
  @ViewChild('StepButton') StepButton: ElementRef;
  @ViewChild('UpdateButton') UpdateButton: ElementRef;
  @ViewChild('commentaire') commentaire: ElementRef;
  commentForm: FormGroup;
  claim: ClaimModel;
  unpaid = 0;
  isEmpty = true;
  isPublic: Boolean = false;
  selectedStep: number;
  requestUpdate: any;
  modalRef: BsModalRef;
  private wizardState: WizardState;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(
    private complaintService: ComplaintService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      checkbox: ['']
    });
  }

  // CommentForm
  get comment() {
    return this.commentForm.get('comment');
  }

  get checkbox() {
    return this.commentForm.get('checkbox');
  }

  ngAfterViewInit() {
    this.loadComplaint();
  }

  ngOnInit() {
  }

  loadComplaint() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
    this.complaintService.getOne(id).subscribe(response => {
      this.claim = response.data;
      if (this.claim) {
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
      } else {
        this.selectedStep = 0;
      }

      this.wizardState = this.wizard.model;

      this.wizardState.navigationMode.goToStep(
        this.selectedStep,
        new EventEmitter(),
        new EventEmitter()
      );
    });
  }
  }

  // Stepper
  previousStep(id) {
    swal({
      title: 'êtes vous sûr?',
      text: 'Cette action est irréversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui!'
    }).then((result) => {
      if (result.value) {
        if (this.claim.status === 'TRANSMISSION_OF_INFORMATION') {
          this.complaintService.setAsRequestComplement(id).subscribe(response => {}, err => {});
        }
        this.ngAfterViewInit();
      }
    });
  }

  requestComplement(id) {
    swal({
      title: 'êtes vous sûr?',
      text: 'Cette action est irréversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui!'
    }).then((result) => {
      if (result.value) {
        if (this.claim.status === 'ANALYSIS') {
          this.complaintService.setAsRequestComplement(id).subscribe(response => {}, err => {});
        }
        this.ngOnInit();
      }
    });
  }

  replyProvided(id) {
    swal({
      title: 'êtes vous sûr?',
      text: 'Cette action est irréversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui!'
    }).then((result) => {
      if (result.value) {
        if (this.claim.status === 'ANALYSIS') {
          this.complaintService.setAsReplyProvided(id).subscribe(response => {}, err => {});
        }
        this.ngOnInit();
      }
    });
  }

  nextStep(id, choice?) {
    swal({
      title: 'êtes vous sûr?',
      text: 'Cette action est irréversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui!'
    }).then((result) => {
      if (result.value) {
        if (this.claim.status === 'CREATED') {
          this.complaintService.setAsSupported(id).subscribe(response => {
            this.loadComplaint();
          }, err => {});
        } else if (this.claim.status === 'SUPPORTED') {
          this.complaintService.setAsAnalysis(id).subscribe(response => {
            this.loadComplaint();
          }, err => {});
        } else if (this.claim.status === 'ANALYSIS') {
          this.complaintService.setAsRequestComplement(id).subscribe(response => {
            this.loadComplaint();
          }, err => {});
        } else if (this.claim.status === 'REQUEST_COMPLEMENT') {
          this.complaintService.setAsTransmissionOfInformation(id).subscribe(response => {
            this.loadComplaint();
          }, err => {});
        } else if (this.claim.status === 'TRANSMISSION_OF_INFORMATION') {
          this.complaintService.setAsReplyProvided(id).subscribe(response => {
            this.loadComplaint();
          }, err => {});
        } else if (this.claim.status === 'REPLY_PROVIDED') {
          this.complaintService.setAsClosed(id).subscribe(response => {
            this.loadComplaint();
          }, err => {});
          this.StepButton.nativeElement.disabled = true;
        }
        /*this.complaintService.nextStep(id, choice).subscribe(
          response => {
            this.claim = response.data;
            if (this.claim.status === 'CLOSED') {
              this.StepButton.nativeElement.disabled = true;
            }
          },
          err => console.log(err)
        );*/
        this.ngOnInit();
      }
    });
  }

  // Add Comment
  addComment() {
    if (this.checkbox.value === null || this.checkbox.value === '') {
      this.isPublic = false;
    } else {
      this.isPublic = true;
    }

    this.claim.feedbacks.push(new FeedbackModel(this.comment.value, new Date(), true, this.isPublic));

    this.complaintService.save(this.claim).subscribe(response => {
        this.commentForm.reset();
        this.ngOnInit();
      }, err => {
      }
    );

    this.isEmpty = true;
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
