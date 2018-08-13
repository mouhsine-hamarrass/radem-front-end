import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ServicesService } from "../../../services/services.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from "underscore";

@Component({
  selector: "app-cancellation-request",
  templateUrl: "./cancellation-request.component.html",
  styleUrls: ["./cancellation-request.component.scss"]
})
export class CancellationRequestComponent implements OnInit {
  public feedback = new FormControl("");

  protected terminationRequest: any;
  protected subscriptionIds: any[];

  constructor(
    private myServices: ServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.myServices.getTerminationRequest(id).subscribe(response => {
      this.terminationRequest = response.data;
      this.subscriptionIds = _.pluck(this.terminationRequest.subscriptions, 'id');
      console.log(this.terminationRequest);
    });
  }

  saveFeedback() {
    if (!this.terminationRequest.feedback) {
      this.terminationRequest.feedback = [];
    }
    this.terminationRequest.feedback.push({
      message: this.feedback.value,
      sendingDate: new Date()
    });
    this.terminationRequest.subscriptions = this.subscriptionIds;
    this.myServices
      .saveTerminationRequest(this.terminationRequest)
      .subscribe(response => {
        console.log(this.terminationRequest);
        this.feedback.reset();
        this.ngOnInit();
      });
  }
}
