import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SubscriptionModel} from '../../../models/subscription.model';
import {WizardComponent, WizardState} from 'angular-archwizard';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import _ from 'underscore';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionRequestStatus} from '../../../../shared/models/user.model';
import * as moment from 'moment';

@Component({
    selector: 'app-request-subscription-detail',
    templateUrl: './request-subscription-detail.component.html',
    styleUrls: ['./request-subscription-detail.component.scss']
})
export class RequestSubscriptionDetailComponent implements OnInit, AfterViewInit {
    @ViewChild('wizard') wizard: WizardComponent;
    @ViewChild('StepButton') StepButton: ElementRef;
    @ViewChild('UpdateButton') UpdateButton: ElementRef;
    @ViewChild('commentaire') commentaire: ElementRef;
    agents: any = [];
    request: SubscriptionModel;
    requestForm: FormGroup;
    commentForm: FormGroup;
    addInterventionForm: FormGroup;
    wizardState: WizardState;
    modalRef: BsModalRef;
    config = {
        backdrop: true,
        ignoreBackdropClick: false,
        class: 'modal-lg'
    };
    selectedStep: number;
    isPublic: Boolean = false;
    wizardSteps = Object.keys(SubscriptionRequestStatus);

    constructor(private modalService: BsModalService,
                private formBuilder: FormBuilder,
                private _changeDetectionRef: ChangeDetectorRef,
                private route: ActivatedRoute,
                private requestService: AdminService,
                private translate: TranslateService,
                private toastrService: ToastrService) {
        this.requestForm = this.formBuilder.group({
            agent: ['', Validators.required],
            dateIntervention: ['', Validators.required],
            phone: ['', Validators.required]
        });
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.required],
            checkbox: ['']
        });
        this.addInterventionForm = this.formBuilder.group({
            agent: ['', Validators.required],
            dateIntervention: ['', Validators.required],
            phone: ['', Validators.required]
        });


    }

    getAgents(): void {
        this.requestService.getAgents().subscribe(response => {
            this.agents = response.data;
        }, error => {
        });
    }

    ngOnInit() {
        this.getRequest();
    }

    ngAfterViewInit(): void {
        // Force another change detection in order to fix the ngFor error
        this._changeDetectionRef.detectChanges();
    }

    getRequest() {
        const id: string = this.route.snapshot.paramMap.get('id');
        if (id !== null) {
            this.requestService.getSubscriptionDetails(id).subscribe(response => {
                this.request = response.data;
                console.log(this.request);
                this.checkStatus();
                if (this.request.status === 'RECEIVED' || this.request.status === 'CREATED') {
                    this.UpdateButton.nativeElement.disabled = true;
                } else {
                    this.UpdateButton.nativeElement.disabled = false;
                }
            });
        }
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

    checkStatus() {
        switch (this.request.status) {
            case 'FILING_APPLICATION':
                this.selectedStep = 0;
                break;
            case 'INTERVENTION':
                this.selectedStep = 1;
                break;
            case 'METER_POSES':
                this.selectedStep = 2;
                break;
            case 'SUBSCRIPTION_INVOICE':
                this.selectedStep = 3;
                break;
            case 'SUBSCRIBED':
                this.selectedStep = 4;
                break;
        }
        this.wizardState = this.wizard.model;
        this.wizardState.navigationMode.goToStep(this.selectedStep, new EventEmitter(), new EventEmitter());
    }

    AddIntervention(template: TemplateRef<any>) {
        if (this.request.status === 'UNPAID_VERIFICATION') {
            /*
            this.requestService.getSolde().subscribe(response => {
                this.impaye = response[0].impaye;
                this.nextStep(this.request.id);
            })
            */
        } else if (this.request.status === 'RECEIVED') {
            this.modalRef = this.modalService.show(template, this.config);
        } else {
            this.nextStep(this.request.id);
        }
    }

    nextStep(id) {
        swal({
            title: this.translate.instant('ARE_YOU_SURE'),
            text: this.translate.instant('THIS_ACTION_IS_IRREVERSIBLE'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: this.translate.instant('CANCEL'),
            confirmButtonText: this.translate.instant('YES_DELETE')
        }).then((result) => {
            if (result.value) {
                const agentId: number = JSON.parse(localStorage.getItem('user')).id;
                console.log(agentId);
                if (this.request.status === 'CREATED') {

                    this.requestService.setAsReceived(id, agentId).subscribe(response => {
                        this.selectedStep = this.selectedStep + 1;
                        this.ngOnInit();
                    }, err => {
                    })

                } else if (this.request.status === 'IN_PROGRESS') {

                    this.requestService.setAsDepositedCounter(id, agentId).subscribe(response => {
                        this.selectedStep = this.selectedStep + 1;
                        this.ngOnInit();
                    }, err => {
                    })

                } else if (this.request.status === 'DEPOSITED_COUNTER') {

                    this.requestService.setAsUnpaidVerification(id, agentId).subscribe(response => {
                        this.selectedStep = this.selectedStep + 1;
                        this.ngOnInit();
                    }, err => {
                    })

                } else if (this.request.status === 'UNPAID_VERIFICATION') {
                    /*
                    this.requestService.setAsSettlement(id, agentId).subscribe(response => {
                        this.selectedStep = this.selectedStep + 1;
                        this.ngOnInit();
                    }, err => {
                    })
                    */
                } else if (this.request.status === 'SETTLEMENT') {

                    this.requestService.setAsClosed(id, agentId).subscribe(response => {
                        this.selectedStep = this.selectedStep + 1;
                        this.ngOnInit();
                    }, err => {
                    })

                }
                /*this.requestService.nextStep(id, this.impaye, agentId).subscribe(response => {
                  this.request = response.data;
                  if (this.request.status === 'CLOSED') {
                    this.StepButton.nativeElement.disabled = true;
                  }
                });*/
            }
        });
    }

    addComment() {
        if (this.commentForm.controls['commentForm'].value === null || this.commentForm.controls['commentForm'].value === '') {
            this.isPublic = false;
        } else {
            this.isPublic = true;
        }

        this.request.feedback.push({message: this.commentForm.controls['comment'].value, sendingDate: new Date(), ispublic: this.isPublic});

        // this.request.agent = JSON.parse(localStorage.getItem('user'));

        this.request.subscriptions = _.pluck(this.request.subscriptions, 'id');
        /*
        this.requestService.saveTerminationRequest(this.request).subscribe(response => {
                this.commentForm.reset();
                this.isEmpty = true;
                this.ngOnInit();
            }, (err) => {
            });
            */
    }
}
