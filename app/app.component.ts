import { Component } from '@angular/core';
import { GCS } from './gcs.service';
import { items } from './customTypes';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  imageList = <items>[];

  /*Angular automatically creates a instance of our service when we pass it in constructor*/
  constructor(private gcsService: GCS) { }

  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    console.log(submittedForm.value.searchParam);
    this.gcsService.getimages(submittedForm.value.searchParam)
      .subscribe(
      (data) => {
        this.imageList = data;
        console.log(this.imageList);
      }
      );
  }
}