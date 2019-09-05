import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-termination-page',
    templateUrl: './termination-page.component.html',
    styleUrls: ['./termination-page.component.scss']
})
export class TerminationPageComponent implements OnInit {

    public nom: string;
    public prenom: string;
    public nom_cli: string;
    public prenom_cli: string;
    public address: string;
    public cin: string;
    public fixe: string;
    public portable: string;
    public lieu: string;
    public fonction: string;
    public tel: string;
    public eau: string;
    public t_eau: string;
    public elec: string;
    public t_elec: string;
    public type: string = 'client';
    public dt_depose: string;

    constructor(private router: Router, private helper: HelperService) {
    }

    ngOnInit() {
    }

    save() {
        let data = {
            info_nom: this.nom,
            info_prenom: this.prenom,
            info_nom_cli: this.nom_cli,
            info_prenom_cli: this.prenom_cli,
            info_address: this.address,
            info_cin: this.cin,
            info_fixe: this.fixe,
            info_portable: this.portable,
            info_lieu: this.lieu,
            info_fonction: this.fonction,
            info_tel: this.tel,
            info_eau: this.eau,
            info_t_eau: this.t_eau,
            info_elec: this.elec,
            info_t_elec: this.t_elec,
            info_type: this.type,
            info_dt_depose: this.dt_depose,
        }
        this.helper.setInfo(data);
        this.router.navigate(['/service-approach/termination-print']);
    }

}
