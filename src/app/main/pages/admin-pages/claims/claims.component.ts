import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  public complaints: any;

  constructor(private requestService: AdminService) { }


  ngOnInit() {
    this.requestService.getComplaints().subscribe(response => {
      this.complaints = response.data;
      console.log(this.complaints);
    }, (err) => {

    });
  }

}
