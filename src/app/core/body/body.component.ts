import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { GiphyApiService } from '../services/giphy-api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {

  private search: Subscription;

  constructor(private giphy: GiphyApiService) { }

  ngOnInit() {
    this.search = this.giphy.search()
      .subscribe(data => {
        console.log('got some data! ', data);
      });
  }

  ngOnDestroy() {
    this.search.unsubscribe();
  }

}
