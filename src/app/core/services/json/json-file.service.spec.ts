import {inject, TestBed} from '@angular/core/testing';

import {JsonFileService} from './json-file.service';

describe('JsonFileService', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [JsonFileService]
      });
   });

   it('should be created', inject([JsonFileService], (service: JsonFileService) => {
      expect(service).toBeTruthy();
   }));
});
