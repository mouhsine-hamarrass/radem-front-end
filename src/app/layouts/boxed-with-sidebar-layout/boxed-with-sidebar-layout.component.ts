import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-boxed-with-sidebar-layout',
  templateUrl: './boxed-with-sidebar-layout.component.html',
  styleUrls: ['./boxed-with-sidebar-layout.component.scss']
})
export class BoxedWithSidebarLayoutComponent implements OnInit {

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.renderer.addClass(document.body, '2-columns');
    this.renderer.addClass(document.body, 'container');
    this.renderer.addClass(document.body, 'boxed-layout');
    this.renderer.setAttribute(document.body, 'data-col', '2-columns');
  }

  ngOnInit() {
    const el = this.elRef.nativeElement.querySelector('#stackNav')
    this.renderer.addClass(el, 'container');
    this.renderer.addClass(el, 'boxed-layout');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, '2-columns');
    this.renderer.removeClass(document.body, 'container');
    this.renderer.removeClass(document.body, 'boxed-layout');
    // this.renderer.removeAttribute(document.body, 'data-col');
    const el = this.elRef.nativeElement.querySelector('#stackNav')
    this.renderer.removeClass(el, 'container');
    this.renderer.removeClass(el, 'boxed-layout');
  }
}
