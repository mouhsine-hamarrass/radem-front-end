import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {DynamicModel} from '../../../../models/dynamic.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-advice',
    templateUrl: './advice.component.html',
    styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {

    dynamicPageForm: FormGroup;
    dynamicContent: DynamicModel = {};
    code: string;
    private translate: TranslateService;

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
            this.toastrService.success(this.translate.instant('SUCCESS_MODIFICATION'), '');
        }, err => {
            this.toastrService.error(this.translate.instant('OOPS_FAILED_CHANGE'), '');
            console.log(err);
        });
    }

}
