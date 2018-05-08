import { Component, OnInit, Input } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }]
})
export class SidebarComponent implements OnInit {
  constructor() { }
  ngOnInit() {

  }


}
