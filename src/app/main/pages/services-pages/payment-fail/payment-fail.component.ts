import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  styleUrls: ['./payment-fail.component.scss']
})
export class PaymentFailComponent implements OnInit {

  home = environment.Home;
  emailRadem = environment.emailRadem;
  Tel = environment.Tel;

  constructor() { }

  ngOnInit() {
  }

}
