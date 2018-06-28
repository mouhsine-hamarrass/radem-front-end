import { Component, OnInit } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { MyServicesService } from '../../core/services/my-services.service';

@Component({
  selector: 'app-new-termination',
  templateUrl: './new-termination.component.html',
  styleUrls: ['./new-termination.component.scss']
})
export class NewTerminationComponent implements OnInit {

  protected terminationRequest: any;

  constructor(private myServicesService: MyServicesService) {
  }

  ngOnInit() {
  }

  public print(printSection?: string) {
    console.log(document.getElementById(printSection));
    if (!printSection) {
      window.print();
    } else {
      let printContents, popupWin, __HEAD;
      __HEAD = document.querySelector('head').innerHTML;
      printContents = document.getElementById(printSection).outerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
      <html>
        ${__HEAD}
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      );
      popupWin.document.close();
    }
  }
}
