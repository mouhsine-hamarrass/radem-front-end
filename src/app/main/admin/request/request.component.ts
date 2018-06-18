import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { RequestService } from '../../core/services/request.service';
import {Router, ActivatedRoute} from '@angular/router';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  private request: any;

  constructor(private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.wizard.wizardState);
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
     this.requestService.getRequest(id).subscribe(response => {
       this.request = response.data;
       console.log(this.request);
    }, (err) => {

    });
  }
  }

}
