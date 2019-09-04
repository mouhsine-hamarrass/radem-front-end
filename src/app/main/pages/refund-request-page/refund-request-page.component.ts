import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-refund-request-page',
    templateUrl: './refund-request-page.component.html',
    styleUrls: ['./refund-request-page.component.scss']
})
export class RefundRequestPageComponent implements OnInit {
    public nom: string;
    public prenom: string;
    public address: string;
    public cin: string;
    public tel: string;
    public eau: string;
    public elec: string;

    constructor(private router: Router, private helper: HelperService) {
    }

    ngOnInit() {
    }

    save() {
        let data = {
            info_nom: this.nom,
            info_prenom: this.prenom,
            info_address: this.address,
            info_cin: this.cin,
            info_tel: this.tel,
            info_eau: this.eau,
            info_elec: this.elec
        }
        this.helper.setInfo(data);
        this.router.navigate(['/refund-print']);
    }
}
