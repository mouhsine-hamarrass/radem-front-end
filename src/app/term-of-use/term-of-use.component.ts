import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-term-of-use',
  templateUrl: './term-of-use.component.html',
  styleUrls: ['./term-of-use.component.scss']
})
export class TermOfUseComponent implements OnInit {
  @Input() hideNavigation = false;
  constructor() { }

  ngOnInit() {
  }

}
