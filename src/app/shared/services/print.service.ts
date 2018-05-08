import {Injectable} from '@angular/core';

@Injectable()
export class PrintService {

  constructor() {
  }

  public print(printSection?: string) {
    if (!printSection) {
      window.print();
    } else {
      let printContents, popupWin, __HEAD;
      __HEAD = document.querySelector('head').innerHTML;
      printContents = document.querySelector(printSection).outerHTML;
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
