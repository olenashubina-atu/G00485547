import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})


export class MyHttp {

  public async get(options: HttpOptions) {
    console.log("URL:", options.url);
    return await CapacitorHttp.get(options);
  }
}
