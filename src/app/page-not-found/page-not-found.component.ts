import {Component, Inject, OnInit} from '@angular/core';
import {LoggerService} from '../core/services/logging/logger.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

   constructor(@Inject('LoggerService') private loggerService: LoggerService) { }

   ngOnInit() {
      this.loggerService.log('... initializing page not found component from shared module.');
   }
}
