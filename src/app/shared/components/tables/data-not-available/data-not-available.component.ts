import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-not-available',
  templateUrl: './data-not-available.component.html',
  styleUrls: ['./data-not-available.component.scss']
})
export class DataNotAvailableComponent implements OnInit {

  @Input() colSpan = 1;

  constructor() {
  }

  ngOnInit() {
  }

}
