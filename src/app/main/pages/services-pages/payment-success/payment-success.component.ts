import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  home = environment.Home;
  emailRadem = environment.emailRadem;
  Tel = environment.Tel;
  oid;
  transaction: any;

  constructor(    private adminService: AdminService,
                  private route: ActivatedRoute,
                  private router: Router) {}

  ngOnInit() {

    this.oid = this.route.snapshot.paramMap.get('id');
    this.getTransactionDetails();

  }

  getTransactionDetails() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adminService.getTransactionDetails(id).subscribe(response => {
        this.transaction = response.data;
        // this.loadTrans();
      });
    }
  }


}
