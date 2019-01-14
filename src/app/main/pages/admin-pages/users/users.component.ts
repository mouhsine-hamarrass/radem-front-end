import {Component, OnInit} from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';
import {User} from '../../../models/user.model';
import {AdminService} from '../../../services/admin.service';
import swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;
    users: Array<User>;
    profilesFilter: any = [];

    constructor(
        private adminService: AdminService,
        private translate: TranslateService,
        private toastrService: ToastrService) {

    }

    ngOnInit() {
        this.listUsers();
        this.profilesFilterable();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.listUsers();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.listUsers();
    }

    listUsers() {
        this.adminService.getListUser(this.page, this.pageSize, this.filter, this.sort).subscribe(response => {
            _.each(response.data.content, (user: User) => {
                user.createdDate = moment(new Date(user.createdDate)).format(environment.defaultDateFormat);
            });
            this.users = response.data.content;
            this.totalElements = response.data.totalElements;
            this.totalPages = response.data.totalPages;
            this.itemsPerPage = response.data.size;
            this.numberOfItems = response.data.numberOfElements;
        }, (err) => {
        });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.listUsers();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.listUsers();
    }

    profilesFilterable(): void {
        this.adminService.getListProfiles().subscribe(response => {
            this.profilesFilter = response.data;
        }, error => {
        });
    }

    changeEnabled(event, user: User): void {
        if (this.users) {
            if (!user.enabled) {
                this.adminService.disableUser(user.id).subscribe((response) => {
                    if (response.status === 'OK') {
                        user.enabled = false;
                    }
                }, (err) => {
                    user.enabled = true;
                });
            } else {
                this.adminService.enableUser(user.id).subscribe((response) => {
                    if (response.status === 'OK') {
                        user.enabled = true;
                    }
                }, (err) => {
                    user.enabled = false;
                });
            }
        }

    }

    dropUser(idUser): void {
        swal({
            title: this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_CONTINUE'),
            text: this.translate.instant('THIS_ACTION_IS_IRREVERSIBLE'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.translate.instant('YES_I_AM_SURE')
        }).then((result) => {
            if (result.value) {
                this.adminService.dropUser(idUser).subscribe((response) => {
                    if (response.status === 'OK') {
                        this.toastrService.success(this.translate.instant('SUCCESS_OPERATION'), '');
                        this.listUsers();
                    }
                }, (err) => {
                });
            }
        });
    }
}
