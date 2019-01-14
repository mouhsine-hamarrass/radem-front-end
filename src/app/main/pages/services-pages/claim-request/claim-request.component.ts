import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ServicesService} from '../../../services/services.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-claim-request',
    templateUrl: './claim-request.component.html',
    styleUrls: ['./claim-request.component.scss']
})
export class ClaimRequestComponent implements OnInit {

    complaintForm: FormGroup;
    reqNumber: number;
    objects: any;

    constructor(
        private myServices: ServicesService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private router: Router,
        private translate: TranslateService
    ) {
        // this.translate.use('fr');
        this.complaintForm = this.formBuilder.group({
            'numero': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'objet': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'description': ['', Validators.compose(
                [
                    Validators.required
                ])]
        });
    }

    ngOnInit() {
        this.reqNumber = Math.floor(Math.random() * 100000);
        this.myServices.getObjects().subscribe(response => this.objects = response.data, err => {
        });
        console.log(JSON.parse(localStorage.getItem('user')));
    }

    save(): void {
        const complaint = {
            claimNumber: this.reqNumber,
            object: this.complaintForm.controls['objet'].value,
            description: this.complaintForm.controls['description'].value,
            complainer: JSON.parse(localStorage.getItem('user'))
        };
        this.myServices.saveComplaint(complaint).subscribe(response => {
            this.toastrService.show('Reclamation ajoutée avec succes');
            this.router.navigate(['/services/claim-requests'])
        }, err => {
        });
    }
}
