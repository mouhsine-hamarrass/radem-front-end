import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../services/utils.service';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Settings} from 'http2';
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
