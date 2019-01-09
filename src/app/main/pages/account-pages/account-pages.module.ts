import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountPagesRoutingModule} from './account-pages-routing.module';
import {ChartsModule} from 'ng2-charts';
import {BsDatepickerModule, BsDropdownModule} from 'ngx-bootstrap';
import {AdminService} from '../../services/admin.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../../shared/components/components.module';
import {ProfileService} from '../../services/profile.service';
import {AccountComponent} from './account/account.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        AccountPagesRoutingModule,
        ChartsModule,
        FormsModule,
        BsDatepickerModule,
        ReactiveFormsModule,
        BsDropdownModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [
        AccountComponent,
    ],
    providers: [
        AdminService,
        ProfileService
    ]
})
export class AccountPagesModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
