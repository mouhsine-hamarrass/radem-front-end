import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class JsonFileService {
   constructor(protected http: HttpClient) {
   }

   /**
    * Load the data defined in the json file
    */
   getData(path: string) {
      return this.http.get(path);
   }
}
