import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printable-cancellation',
  templateUrl: './printable-cancellation.component.html',
  styleUrls: ['./printable-cancellation.component.scss']
})
export class PrintableCancellationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(document.getElementById('printSection'));
    let printContents, popupWin, __HEAD;
    __HEAD = document.querySelector('head').innerHTML;
    printContents = document.getElementById('printSection').outerHTML;
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
