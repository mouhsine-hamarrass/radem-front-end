import {Injectable} from '@angular/core';

@Injectable()
export class DataService {

  constructor() {
  }

  get(key) {
    const value = localStorage.getItem(key);
    if (value === undefined || value === null || value === '' || value === 'undefined') {
      return null;
    }
    return JSON.parse(value);
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear(key) {
    localStorage.setItem(key, undefined);
  }
}
