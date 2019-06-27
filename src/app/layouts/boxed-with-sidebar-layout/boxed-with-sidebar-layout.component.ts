import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-boxed-with-sidebar-layout',
  templateUrl: './boxed-with-sidebar-layout.component.html',
  styleUrls: ['./boxed-with-sidebar-layout.component.scss']
})
export class BoxedWithSidebarLayoutComponent implements OnInit, OnDestroy {

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
