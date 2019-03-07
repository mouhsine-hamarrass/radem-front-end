import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, EventEmitter} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ServicesService} from '../../../services/services.service';
import {StatusModel} from '../../../models/status.model';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {environment} from '../../../../../environments/environment';
import {FeedbackModel} from '../../../models/feedback.model';
import {CancellationRequestModel} from '../../../models/cancellation-request.model';

@Component({
  selector: 'app-cancellation-detail',
  templateUrl: './cancellation-detail.component.html',
  styleUrls: ['./cancellation-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CancellationDetailComponent implements OnInit, AfterViewInit {

  public user: User;
  terminationStatus: Array<StatusModel> = [{id: 1, status: '', stepOrder: 1}];
  terminationDetails: CancellationRequestModel;
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
    this.getTerminationStatus();
    this.getTerminationDetail();
  }

  getTerminationDetail() {
    const requestNo: string = this.route.snapshot.paramMap.get('id');
    if (requestNo !== null) {
      this.services.getTerminationDetails(requestNo).subscribe(response => {
        if (response.data) {
          this.terminationDetails = response.data;
          this.terminationDetails.feedbacks = this.terminationDetails.feedbacks.reverse();
          this.selectedStep = this.terminationDetails.status.stepOrder;

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

  getTerminationStatus() {
    this.services.getTerminationStatus().subscribe(response => {
      if (response.data) {
        this.terminationStatus = response.data;
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
    this.services.saveFeedback(this.terminationDetails.id, feedback).subscribe(response => {
      if (response.data) {
        this.userComment = '';
        this.getTerminationDetail();
      }
    }, error => {
      console.log(error)
    })
  }

}
