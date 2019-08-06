import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-term-of-use',
  templateUrl: './term-of-use.component.html',
  styleUrls: ['./term-of-use.component.scss']
})
export class TermOfUseComponent implements OnInit {
  @Input() hideNavigation = false;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

}
