import {Component, Inject, OnInit} from '@angular/core';
import {LoggerService} from '../core/services/logging/logger.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
   title = 'This page isn\'t available';
   message = 'Le lien que vous avez suivi peut être brisé ou la page peut avoir été supprimée.';

   constructor(@Inject('LoggerService') private loggerService: LoggerService) { }

   ngOnInit() {
      this.loggerService.log('... initializing page not found component from shared module.');
   }
}
