import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RequestService } from '../../core/services/request.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestComponent implements OnInit {
  private request: any;

  constructor(private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
     this.requestService.getRequest(id).subscribe(response => {
       this.request = response.data;
    }, (err) => {

    });
  }
  }

}
