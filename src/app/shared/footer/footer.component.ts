import {Component, HostBinding} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  // moduleId: module.id,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  currentDate: Date = new Date();
  appName = environment.appName;

}
