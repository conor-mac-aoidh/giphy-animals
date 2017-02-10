import { Component, OnInit, OnDestroy, ViewChild, trigger, style, transition, animate } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { Gif } from '../models/gif';
import { GiphyApiService, Response } from '../services/giphy-api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  animations: [
    trigger('loadingAnim', [
      transition(':leave', [
        animate(500, style({
          opacity: 0
        }))
      ]),
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(500, style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class BodyComponent implements OnInit, OnDestroy {

  public loading = true;
  public radio = 'kittens';
  public errorMsg = '';

  @ViewChild('modal') public modal: ModalDirective;

  private subscription: Subscription;

  public gif: Gif;
  public gifs: Gif[];

  public page: number = 1;
  public itemsPerPage: number = 15;
  public totalItems: number = 0;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  constructor(private giphy: GiphyApiService) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.errorMsg = '';
    this.loading = true;
    const offset = this.itemsPerPage * this.page;
    this.subscription = this.giphy.search(this.radio, offset)
      .subscribe((res: Response<Gif>) => {
        this.gifs = res.data;
        this.loading = false;
        this.totalItems = res.pagination.total_count;
        this.numPages = Math.floor(this.totalItems / this.itemsPerPage);
        console.log('got some data! ', res);
      }, err => {
        this.errorMsg = 'Failed to fetch data..';
      })
  }

  showModal(gif) {
    this.gif = gif;
    this.modal.show();
  }

  onChangeTable(data) {
    this.page = data.page;
    this.search();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
