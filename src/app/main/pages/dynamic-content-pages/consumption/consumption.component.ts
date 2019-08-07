import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {

  dynamic: DynamicModel;

  constructor(private adminServices: AdminService) {
  }

  ngOnInit() {
    this.adminServices.getDynamicContent('ma_conso').subscribe(
      response => {
        this.dynamic = response.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
