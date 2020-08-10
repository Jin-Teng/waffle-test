
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  log(msg: any) {
    if (!environment.production) {
      console.log(new Date() + ": " + JSON.stringify(msg));
    }
  }
}
