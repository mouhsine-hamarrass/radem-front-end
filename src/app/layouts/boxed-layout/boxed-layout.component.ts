import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {marginLeft} from 'html2canvas/dist/types/css/property-descriptors/margin';


@Component({
  selector: 'app-boxed-layout',
  templateUrl: './boxed-layout.component.html',
  styleUrls: ['./boxed-layout.component.scss']
})
export class BoxedLayoutComponent implements OnDestroy, OnInit {

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');  }

  ngOnInit() {
    const el = this.elRef.nativeElement.querySelector('#stackNav');
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
    // this.renderer.addClass(document.body, 'mar');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'mar');
    const el = this.elRef.nativeElement.querySelector('#stackNav')
  }

}
