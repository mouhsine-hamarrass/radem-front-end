import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'margin-left');
    this.renderer.removeStyle(document.body, 'margin-right');
  }
}
