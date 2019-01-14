import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DynamicModel} from '../../../../models/dynamic.model';
import {AdminService} from '../../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-dynamic-content',
    templateUrl: './dynamic-content.component.html',
    styleUrls: ['./dynamic-content.component.scss']
})
export class DynamicContentComponent implements OnInit {

    dynamicPageForm: FormGroup;
    dynamicContent: DynamicModel = {};
    dynamicList: Array<DynamicModel>;
    chosenDynamic: string;

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

    save(dynamicContent) {
        this.adminServices.saveDynamicContent(dynamicContent).subscribe(response => {
            this.toastrService.success('Modification réussite', '');
        }, err => {
            this.toastrService.error('Oops! modification échoué', '');
            console.log(err);
        });
    }

}
