import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {Setting} from '../../../models/setting.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settings: Array<Setting>;
  private translate: TranslateService;

  constructor(private adminService: AdminService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.adminService.getSettings().subscribe(response => {
      this.settings = response.data;
    }, (err) => {
    });
  }

  saveSettings() {
    this.adminService.saveSettings(this.settings).subscribe(response => {
      this.settings = response.data;
      this.toastrService.success(this.translate.instant('SUCCESS_MODIFICATION'), '');
    }, (err) => {
      this.toastrService.success(this.translate.instant('OOPS_FAILED_CHANGE'), '');
    });
  }
}
