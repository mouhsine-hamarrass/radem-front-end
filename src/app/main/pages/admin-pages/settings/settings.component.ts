import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../services/utils.service';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settingsForm;
  public settings: any;

  constructor(private utilsService: UtilsService,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.settingsForm = this.formBuilder.group({
      code: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
