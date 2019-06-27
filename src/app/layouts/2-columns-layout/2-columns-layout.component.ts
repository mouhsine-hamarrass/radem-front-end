import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-2-columns-layout',
  templateUrl: './2-columns-layout.component.html',
  styleUrls: ['./2-columns-layout.component.scss']
})
export class TwoColumnsLayoutComponent implements OnDestroy, OnInit {

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
