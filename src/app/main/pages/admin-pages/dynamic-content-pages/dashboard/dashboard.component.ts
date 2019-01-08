import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DynamicModel} from '../../../../models/dynamic.model';
import {AdminService} from '../../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    dynamicPageForm: FormGroup;
    dynamicContent: DynamicModel = {};
    code: string;

    constructor(private adminServices: AdminService,
                private toastrService: ToastrService,
                private formBuilder: FormBuilder) {

        this.dynamicPageForm = this.formBuilder.group({
            'title': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'content': ['', Validators.compose(
                [
                    Validators.required
                ])]
        });
    }

    ngOnInit() {
        this.adminServices.getDynamicContent(this.code).subscribe(response => {
            this.dynamicContent = response.data;
            for (const key in this.dynamicContent) {
                if (this.dynamicContent.hasOwnProperty(key)) {
                    if (this.dynamicPageForm.controls.hasOwnProperty(key)) {
                        this.dynamicPageForm.controls[key].setValue(this.dynamicContent[key]);
                    }
                }
            }
        }, err => {
            console.log(err);
        });
    }

    save(dynamicContent) {
        this.adminServices.saveDynamicContent(this.code, dynamicContent).subscribe(response => {
            this.toastrService.success('Modification réussite', '');
        }, err => {
            this.toastrService.error('Oops! modification échoué', '');
            console.log(err);
        });
    }

}
