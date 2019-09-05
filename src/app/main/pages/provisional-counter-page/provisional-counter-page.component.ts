import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';


@Component({
    selector: 'app-provisional-counter-page',
    templateUrl: './provisional-counter-page.component.html',
    styleUrls: ['./provisional-counter-page.component.scss']
})
export class ProvisionalCounterPageComponent implements OnInit {

    public nom: string;
    public prenom: string;
    public address: string;

    constructor(private router: Router, private helper: HelperService) {
    }

    ngOnInit() {
    }

    save() {
        let data = {
            info_nom: this.nom,
            info_prenom: this.prenom,
            info_address: this.address
        }
        this.helper.setInfo(data);
        this.router.navigate(['/service-approach/counter-print'])
    }


}
