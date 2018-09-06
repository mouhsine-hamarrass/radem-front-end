import {Component, OnInit, ViewChild} from '@angular/core';
import {Setting} from '../../../models/setting.model';
import {AdminService} from '../../../services/admin.service';
import {QuillEditorComponent} from 'ngx-quill';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.scss']
})
export class AdvicesComponent implements OnInit {
  advicesContent: Setting;
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
      this.toastrService.success('Modification réussite', '');
    }, err => {
      this.toastrService.error('Oops! modification échoué', '');
      console.log(err);
    });
  }

}
