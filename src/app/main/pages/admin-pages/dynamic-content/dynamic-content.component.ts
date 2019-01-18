import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {DynamicModel} from '../../../models/dynamic.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-dynamic-content',
    templateUrl: './dynamic-content.component.html',
    styleUrls: ['./dynamic-content.component.scss']
})
export class DynamicContentComponent implements OnInit {

    dynamicPageForm: FormGroup;
    dynamicContent: DynamicModel = {};
    dynamicList: Array<DynamicModel>;
    chosenDynamic = '';

    constructor(private adminServices: AdminService,
                private toastrService: ToastrService,
                private translate: TranslateService,
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
        this.getDynamicList();
    }

    getDynamicList() {
        this.adminServices.getAllDynamicPages().subscribe(response => {
            this.dynamicList = response.data;
        }, error => {
            console.log(error);
        })
    }

    choseDynamicToDisplay() {
        this.getDynamicContent(this.chosenDynamic);
    }

    getDynamicContent(chosenDynamic) {
        this.adminServices.getDynamicContent(chosenDynamic).subscribe(response => {
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

    save() {
        this.dynamicContent.title = this.dynamicPageForm.controls['title'].value;
        this.dynamicContent.content = this.dynamicPageForm.controls['content'].value;
        this.adminServices.saveDynamicContent(this.dynamicContent).subscribe(response => {
            this.toastrService.success(this.translate.instant('SUCCESS_MODIFICATION'), '');
        }, err => {
            this.toastrService.error(this.translate.instant('OOPS_FAILED_CHANGE'), '');
            console.log(err);
        });
    }

}
