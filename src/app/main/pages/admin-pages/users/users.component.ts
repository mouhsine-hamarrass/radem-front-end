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
  protected itemsPerPage: number;

  protected numberOfItems: number;

  protected totalItems: number;

  protected totalPages: number;

  protected page: number;

  protected pageSize: number;

  protected keyword: string;

  users: Array<User>;

  constructor(private adminService: AdminService, private translate: TranslateService, private toastrService: ToastrService) {

  }

  ngOnInit() {
    this.itemsPerPage = 5;
    this.pageSize = 0;
    this.page = 1;
    this.keyword = '';
    this.listUsers();
  }

  pageChanged(page: number): void {
    this.page = page;
    this.listUsers();
  }

  filterMessages(pageSize: number): void {
    this.itemsPerPage = pageSize;
    this.pageSize = pageSize;
    this.listUsers();
  }

  searchMessages(keyword: string): void {
    this.keyword = keyword;
    this.listUsers();
  }

  public listUsers() {
    this.adminService.getListUser(this.page, this.pageSize, this.keyword).subscribe(response => {
      if (response.data && response.data['content']) {
        _.each(response.data['content'], (user: User) => {
          user.createdDate = moment(new Date(user.createdDate)).format(environment.defaultDateFormat);
        });
        this.users = response.data['content'];
        this.totalItems = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }
    }, (err) => {
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
      title: 'Etes-vous sûr de vouloir continuer',
      text: 'Cette action est irréversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Je suis sûr!'
    }).then((result) => {
      if (result.value) {
        this.adminService.dropUser(idUser).subscribe((response) => {
          if (response.status === 'OK') {
            this.toastrService.success('Opération réussite', '');
            this.listUsers();
          }
        }, (err) => {
        });
      }
    });
  }
}
