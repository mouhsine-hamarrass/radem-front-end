import {Component, OnInit, ViewChild} from '@angular/core';
import {Setting} from '../../../models/setting.model';
import {AdminService} from '../../../services/admin.service';
import {QuillEditorComponent} from 'ngx-quill';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.scss']
})
export class AdvicesComponent implements OnInit {
  advicesContent: Setting;
  private translate: TranslateService;
  content: string;

  constructor(private adminServices: AdminService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.adminServices.getAdvices().subscribe(response => {
      this.advicesContent = response.data;
      this.content = this.advicesContent.value;
    }, err => {
      console.log(err);
    });
  }

  save() {
    this.advicesContent.value = this.content;
    this.adminServices.saveAdvices(this.advicesContent).subscribe(response => {
      this.toastrService.success(this.translate.instant('SUCCESS_MODIFICATION'), '');
    }, err => {
      this.toastrService.error(this.translate.instant('OOPS_FAILED_CHANGE'), '');
      console.log(err);
    });
  }

}
