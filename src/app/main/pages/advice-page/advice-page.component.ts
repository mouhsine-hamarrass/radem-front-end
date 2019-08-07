import {Component, OnInit} from '@angular/core';
import {Setting} from '../../models/setting.model';
import {AdminService} from '../../services/admin.service';
import {DynamicModel} from '../../models/dynamic.model';

@Component({
  selector: 'app-advice-page',
  templateUrl: './advice-page.component.html',
  styleUrls: ['./advice-page.component.scss']
})
export class AdvicePageComponent implements OnInit {

  dynamic: DynamicModel;

  constructor(private adminServices: AdminService) {
  }

  ngOnInit() {
    this.adminServices.getDynamicContent('conseil').subscribe(
      response => {
        this.dynamic = response.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
