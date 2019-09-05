import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';


@Component({
    selector: 'app-tax-page',
    templateUrl: './tax-page.component.html',
    styleUrls: ['./tax-page.component.scss']
})
export class TaxPageComponent implements OnInit {

    public nom: string;
    public prenom: string;
    public address: string;
    public cin: string;
    public tel: string;
    public eau: string;
    public t_eau: string;
    public elec: string;
    public t_elec: string;
    public rib: string;

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
            info_t_eau: this.t_eau,
            info_elec: this.elec,
            info_t_elec: this.t_elec,
            info_rib: this.rib,
        }
        this.helper.setInfo(data);
        this.router.navigate(['/service-approach/tax-print']);
    }
}
