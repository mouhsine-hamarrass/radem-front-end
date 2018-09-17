import {Component, OnInit} from '@angular/core';
import {ComplaintService} from '../../../services/complaint.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  public complaints: any;

  constructor(private complaintService: ComplaintService) {
  }

  ngOnInit() {
    this.complaintService.getList().subscribe(response => {
      this.complaints = response.data;
    }, (err) => {
    });
  }
}
