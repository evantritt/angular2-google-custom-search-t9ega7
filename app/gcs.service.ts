import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { items } from './customTypes';
import 'rxjs/Rx';

@Injectable()
export class GCS {
  imageList = <items>[];

  //Shubham's Key
  API_KEY = 'AIzaSyAAEkJrnkKX86AqSVxN8XJYSfuPHHvD_jE';
  CX = '23ca1026e20df4685';

  SEARCH_TYPE = 'image';

  /* Creating http instance*/
  constructor(private http: Http) {}

  getimages(queryParam) {
    const headers = new Headers({
      'Ocp-Apim-Subscription-Key': '322578fcf7f644cab2c8ea87f9293295',
    });
    return this.http
      .get(
        'https://www.googleapis.com/customsearch/v1?q=' +
          queryParam +
          '&cx=' +
          this.CX +
          '&searchType=' +
          this.SEARCH_TYPE +
          '&key=' +
          this.API_KEY
      )
      .map(
        //Using the map function for RxJs
        (response: Response) => {
          const data = response.json();
          console.log(data);
          const extracteddata = data.items;
          const tempArray = [];
          extracteddata.forEach((element) => {
            tempArray.push({
              thumbnailLink: element.image.thumbnailLink,
              width: element.image.width,
            });
            this.imageList = <items>[...tempArray]; //Updating the State Immutably
          });
          return this.imageList;
        }
      );
  }
}
