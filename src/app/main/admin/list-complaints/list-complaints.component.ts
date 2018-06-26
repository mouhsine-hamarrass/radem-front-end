import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../core/services/request.service';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.scss']
})
export class ListComplaintsComponent implements OnInit {

  constructor(private requestService: RequestService) { }
  public complaints: any;

  ngOnInit() {
    this.requestService.getComplaints().subscribe(response => {
      this.complaints = response.data;
      console.log(this.complaints);
    }, (err) => {

    });
  }

}
