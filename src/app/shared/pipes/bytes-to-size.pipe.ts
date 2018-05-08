import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'bytesToSize'
})
export class BytesToSizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (value === 0) {
      return '0 Byte';
    }
    const i = parseFloat(Math.floor(Math.log(value) / Math.log(1024)).toString());
    return Math.round(value / Math.pow(1024, i)) + ' ' + sizes[i];
  }

}
