import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filters: any;
  selectedItem: number;

  @Output() onfilterChanged: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.filters = [
      {value: 5, label: '5'},
      {value: 10, label: '10'},
      {value: 25, label: '25'},
      {value: 50, label: '50'},
      {value: 100, label: '100'}
    ];
    this.selectedItem = this.filters[0].value;
  }

  filterChanged(event: any): void {
    this.onfilterChanged.emit(parseFloat(this.selectedItem.toString()));
  }
}
