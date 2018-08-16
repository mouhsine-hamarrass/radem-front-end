import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit {

  protected feedback = new FormControl('');
  protected complaint: any;
  constructor(private myServices: ServicesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.myServices.getComplaint(id).subscribe(response => this.complaint = response.data, err => { });
    console.log(this.complaint);
  }

  saveFeedback() {
    if (!this.complaint.feedback) {
      this.complaint.feedback = [];
    }
    this.complaint.feedback.push({ message: this.feedback.value, sendingDate: new Date() });
    this.myServices.saveComplaint(this.complaint).subscribe(response => {
      console.log(this.complaint);
      this.feedback.reset();
      this.ngOnInit();
    });
  }
}
