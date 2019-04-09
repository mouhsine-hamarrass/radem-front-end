import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute} from '@angular/router';
import {TransactionModel} from '../../../models/Transaction.model';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {

  home = environment.Home;
  emailRadem = environment.emailRadem;
  Tel = environment.Tel;
  oid;
  flag: boolean;
  transaction: TransactionModel;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.oid = this.route.snapshot.paramMap.get('id');
    this.getTransactionDetails();
  }


  getTransactionDetails() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adminService.getTransactionDetails(id).subscribe(response => {
        this.transaction = response.data;
      });
    }
  }

}
