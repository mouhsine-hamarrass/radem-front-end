import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class HelperService {
    private info: any = null;

   // private info: Subject<any> = new Subject<any>();

    constructor() {
    }

    setInfo(value: any) {
        this.info = value;
    }

    getInfo() {
        return this.info;
    }

/*    public sharedInfo(value: any) {debugger
        this.info.next(value);
    }
    public getInfos(){debugger
        return this.info.asObservable();
    }*/
}

