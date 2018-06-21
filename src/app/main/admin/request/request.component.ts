import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { RequestService } from '../../core/services/request.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestComponent implements OnInit {
  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('button') button: ElementRef;
  private request: any;
  public modalRef: BsModalRef;
  public config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    for (let stepIndex = 0; stepIndex < 4; stepIndex++) {
    }
    console.log(this.wizard.model.navigationMode);
    /*const b: HTMLElement = this.button.nativeElement as HTMLElement;
    for (let stepIndex = 0; stepIndex < 2; stepIndex++) {
      b.click();
    }*/
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

}
