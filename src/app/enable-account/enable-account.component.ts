import {Component, OnInit} from '@angular/core';
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
                private router: Router) {
    }

    ngOnInit() {
        const token = this.route.snapshot.queryParams.token;
        this.enableAccountService.enableUserAccount(token).subscribe(response => {
        }, error => {
            this.router.navigate(['/login']);
        })
    }

}
