import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {EnableAccountService} from '../main/services/enable-account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-enable-account',
    templateUrl: './enable-account.component.html',
    styleUrls: ['./enable-account.component.scss']
})
export class EnableAccountComponent implements OnInit {

    constructor(private enableAccountService: EnableAccountService,
                private route: ActivatedRoute,
                private renderer: Renderer2,
                private router: Router) {
    }

    ngOnInit() {
      this.renderer.setStyle(document.body, 'margin-left', '30px');
      this.renderer.setStyle(document.body, 'margin-right', '30px');
        const token = this.route.snapshot.queryParams.token;
        this.enableAccountService.enableUserAccount(token).subscribe(response => {
        }, error => {
            this.router.navigate(['/login']);
        })
    }

}
