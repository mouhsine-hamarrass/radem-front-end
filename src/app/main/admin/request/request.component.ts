import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { RequestService } from '../../core/services/request.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WizardComponent} from 'angular-archwizard';
import {FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestComponent implements OnInit {
  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('button') button: ElementRef;
  @ViewChild('commentaire') commentaire: ElementRef;
  public requestForm: FormGroup;
  public commentForm: FormGroup;
  public request: any;
  public requestUpdate: any;
  public modalRef: BsModalRef;
  public config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private requestService: RequestService,
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
    }

    get agent() {
      return this.requestForm.get('agent');
    }
    get dateIntervention() {
      return this.requestForm.get('dateIntervention');
    }
    get phone() {
      return this.requestForm.get('phone');
    }

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
    console.log(localStorage.getItem('user'));*/
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
     this.requestService.getRequest(id).subscribe(response => {
       this.request = response.data;
       console.log(this.request);
    }, (err) => {
    });
   }
  }

  openUpdateForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  focus() {
    console.log(this.commentaire);
    this.commentaire.nativeElement.focus();
 }

 addComment() {
   this.request.feedback.push({message: this.comment.value, sendingDate: new Date()});
   this.requestService.addTerminationRequest(this.request).subscribe(response => {
    this.commentForm.reset();
    console.log(this.request);
   },
   (err) => {
    });
 }

 add() {
   this.requestUpdate = {
     id: this.request.id,
     agent: this.agent.value,
     date: this.dateIntervention.value,
     phone: this.phone.value
   };
   /*this.requestService.saveRequest().subscribe(response => {
     console.log(response);
     this.ngOnInit();
   });*/
 }

}
