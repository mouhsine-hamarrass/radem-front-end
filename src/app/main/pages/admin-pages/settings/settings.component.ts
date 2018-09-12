import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {Setting} from '../../../models/setting.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settings: Array<Setting>;

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
      this.toastrService.success('La modification effectuée avec succès', '');
    }, (err) => {
      this.toastrService.success('Oups! Erreur de modification.', '');
    });
  }
}
