import {Injectable} from '@angular/core';

@Injectable()
export class DataService {

  constructor() {
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear(key) {
    localStorage.setItem(key, undefined);
  }
}
