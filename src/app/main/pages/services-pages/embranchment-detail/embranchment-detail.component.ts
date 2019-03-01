import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {StatusModel} from '../../../models/status.model';
import {BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from '../../../services/services.service';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {environment} from '../../../../../environments/environment';
import {FeedbackModel} from '../../../models/feedback.model';
import {EmbranchmentRequestModel} from '../../../models/embranchment-request.model';

@Component({
  selector: 'app-embranchment-detail',
  templateUrl: './embranchment-detail.component.html',
  styleUrls: ['./embranchment-detail.component.scss']
})
export class EmbranchmentDetailComponent implements OnInit, AfterViewInit {


  public user: User;
  embranchmentStatus: Array<StatusModel> = [{id: 1, status: '', stepOrder: 1}];
  embranchmentDetails: EmbranchmentRequestModel;
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
    this.getEmbranchmentStatus();
    this.getEmbranchmentDetail();
  }

  getEmbranchmentDetail() {
    const requestNo: string = this.route.snapshot.paramMap.get('id');
    if (requestNo !== null) {
      this.services.getEmbranchmentDetails(requestNo).subscribe(response => {
        if (response.data) {
          this.embranchmentDetails = response.data;
          this.embranchmentDetails.feedbacks = this.embranchmentDetails.feedbacks.reverse();
          this.selectedStep = this.embranchmentDetails.status.stepOrder;

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

  getEmbranchmentStatus() {
    this.services.getEmbranchmentStatus().subscribe(response => {
      if (response.data) {
        this.embranchmentStatus = response.data;
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
    this.services.saveFeedback(this.embranchmentDetails.id, feedback).subscribe(response => {
      if (response.data) {
        this.userComment = '';
        this.getEmbranchmentDetail();
      }
    }, error => {
      console.log(error)
    })
  }

}
