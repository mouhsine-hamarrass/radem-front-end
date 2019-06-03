import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../../models/user.model';
import {StatusModel} from '../../../models/status.model';
import {BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from '../../../services/services.service';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {environment} from '../../../../../environments/environment';
import {FeedbackModel} from '../../../models/feedback.model';
import {RefundRequestModel} from '../../../models/refund-request.model';

@Component({
  selector: 'app-refund-detail',
  templateUrl: './refund-detail.component.html',
  styleUrls: ['./refund-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RefundDetailComponent implements OnInit, AfterViewInit {

  public user: User;
  RefundStatus: Array<StatusModel> = [{id: 1, status: '', stepOrder: 1}];
  RefundDetails: RefundRequestModel;
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
    this.getRefundDetail();
  }


  getRefundDetail() {
    const requestNo: string = this.route.snapshot.paramMap.get('id');
    if (requestNo !== null) {
      this.services.getRefundDetails(requestNo).subscribe(response => {
        if (response.data) {
          this.RefundDetails = response.data;
          this.RefundDetails.feedbacks = this.RefundDetails.feedbacks.reverse();
          this.selectedStep = this.RefundDetails.status.stepOrder;

          setTimeout(() => {
            const stepsIndicator = document.querySelector('.steps-indicator li[step-symbol="' + this.selectedStep + '"]');
            if (stepsIndicator) {
              stepsIndicator.setAttribute('class', 'done');
            }
          }, 500)

        }
      }, error => {
        console.log(error);
      })
    }
  }

  getSubscriptionStatus() {
    this.services.getRefundStatus().subscribe(response => {
      if (response.data) {
        this.RefundStatus = response.data;
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
    this.services.saveFeedback(this.RefundDetails.id, feedback).subscribe(response => {
      if (response.data) {
        this.userComment = '';
        this.getRefundDetail();
      }
    }, error => {
      console.log(error)
    })
  }

}
