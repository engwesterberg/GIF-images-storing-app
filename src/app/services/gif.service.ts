import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  constructor(private _http: HttpClient) { }

  getGifs(queryString: string, limit = 10) {
    const url = 'https://api.giphy.com/v1/gifs/search	';
    let params = new HttpParams();
    params = params.append('q', queryString);
    params = params.append('api_key', 'CfbLkBNYxAXz61o8jTyJs2yUdjWOJlAh')
    params = params.append('limit', limit);

    // const headers = new HttpHeaders()
    //   .append('Content-Type', 'application/json')
    //   .append('Access-Control-Allow-Headers', 'Content-Type')
    //   .append('Access-Control-Allow-Methods', 'GET')
    //   .append('Access-Control-Allow-Origin', '*');



    return this._http.get(url, {
      params: params,
    }).pipe(map((res: any) => res.data));
  }
}
