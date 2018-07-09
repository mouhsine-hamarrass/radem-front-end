import {Component, Inject} from '@angular/core';
import {AuthHelper} from './core/services/security/auth.helper';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import moment = require('moment');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(@Inject('defaultLanguage') private defaultLanguage: string,
              private authHelper: AuthHelper,
              private translate: TranslateService) {

    // Store default language into localStorage
    localStorage['language'] = this.defaultLanguage;

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(defaultLanguage);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage['language'] || defaultLanguage);
    moment.locale(defaultLanguage);
    moment().format(environment.defaultDateFormat);

    // this.dateTimeAdapter.setLocale(localStorage['language'] || defaultLanguage);
    environment.defaultDateFormat = defaultLanguage === 'fr' ? 'DD-MM-YYYY HH:mm' : 'DD/MM/YYYY HH:mm';

    console.log('Initializing the app component ...');

    /*/ if (this.swUpdate.isEnabled) {

        this.swUpdate.checkForUpdate();
        this.swUpdate.available.subscribe(event => {
           console.log('A newer version is now available. Refresh the page now to update the cache');
           window.location.reload();
        });
     }*/
  }

  isActive(): boolean {
    return this.authHelper.isUserLogged();
  }
}
