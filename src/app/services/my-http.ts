import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})


export class MyHttp {
  apiKey: string = '70b2a2787a3fb6f37ef3c1c565cec19d'; 
  baseUrl: string = 'https://api.themoviedb.org/3';

  public async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
}
