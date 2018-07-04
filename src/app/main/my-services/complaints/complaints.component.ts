import { Component, OnInit } from '@angular/core';
import { MyServicesService } from '../../core/services/my-services.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  protected complaints: any;

  constructor(private myServicesService: MyServicesService) { }

  ngOnInit() {
    this.myServicesService.getComplaints().subscribe(response => {
      this.complaints = response.data;
      console.log(this.complaints);
    });
  }

}
