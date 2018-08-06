import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyword: string;
  @Output() onblur: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.onblur.emit(this.keyword);
  }

}
