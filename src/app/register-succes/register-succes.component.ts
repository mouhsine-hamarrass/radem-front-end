import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-register-succes',
  templateUrl: './register-succes.component.html',
  styleUrls: ['./register-succes.component.scss']
})
export class RegisterSuccesComponent implements OnInit {

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

}
