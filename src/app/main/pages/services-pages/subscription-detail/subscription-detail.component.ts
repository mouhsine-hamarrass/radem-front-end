import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, EventEmitter} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {WizardComponent, WizardState} from 'angular-archwizard';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';
import {StatusModel} from '../../../models/status.model';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionRequestModel} from '../../../models/subscription-request.model';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {environment} from '../../../../../environments/environment';
import {FeedbackModel} from '../../../models/feedback.model';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionDetailComponent implements OnInit, AfterViewInit {

  public user: User;
  subscriptionStatus: Array<StatusModel> = [{id: 1, status: '', stepOrder: 1}];
  subscriptionDetails: SubscriptionRequestModel;
  selectedStep: number;
  agentAvatar;
  userComment = '';

  constructor(private modalService: BsModalService,
              private _changeDetectionRef: ChangeDetectorRef,
              private route: ActivatedRoute,
              private services: ServicesService) {
  }

  ngOnInit() {
    this.agentAvatar = 'assets/images/profile.png';
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
      this.user.avatar = this.user.avatar || environment.defaultAvatar;
    }
  }

  ngAfterViewInit(): void {
    // Force another change detection in order to fix the ngFor error
    this._changeDetectionRef.detectChanges();
    this.getSubscriptionStatus();
    this.getSubscriptionDetail();
  }

  getSubscriptionDetail() {
    const requestNo: string = this.route.snapshot.paramMap.get('id');
    if (requestNo !== null) {
      this.services.getSubscriptionDetails(requestNo).subscribe(response => {
        if (response.data) {
          this.subscriptionDetails = response.data;
          this.subscriptionDetails.feedbacks = this.subscriptionDetails.feedbacks.reverse();
          this.selectedStep = this.subscriptionDetails.status.stepOrder;

          setTimeout(() => {
            const stepsIndicator = document.querySelector('.steps-indicator li[step-symbol="' + this.selectedStep + '"]');
            stepsIndicator.setAttribute('class', 'done');
          }, 200)

        }
      }, error => {
        console.log(error);
      })
    }
  }

  getSubscriptionStatus() {
    this.services.getSubscriptionStatus().subscribe(response => {
      if (response.data) {
        this.subscriptionStatus = response.data;
      }
    }, error => {
      console.log(error)
    })
  }

  postFeedBack() {
    const feedback: FeedbackModel = {
      isPublic: true,
      isRademResponse: false,
      message: this.userComment,
      sender: this.user.username,
      sendingDate: new Date()
    };
    this.services.saveFeedback(this.subscriptionDetails.id, feedback).subscribe(response => {
      if (response.data) {
        this.userComment = '';
        this.getSubscriptionDetail();
      }
    }, error => {
      console.log(error)
    })
  }

}
