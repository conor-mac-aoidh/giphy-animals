import { Directive, HostListener, Input, OnInit, ElementRef } from '@angular/core';

import { Gif } from '../models/gif';
import { GiphyApiService } from '../services/giphy-api.service';

@Directive({
  selector: '[appPreload]'
})
export class PreloadDirective implements OnInit {

  @Input('appPreload') public gif: Gif;

  constructor(private giphy: GiphyApiService,
    private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.src = this.gif.images.fixed_width.url;
  }

  @HostListener('mouseover') public mouseover(): void {
    this.giphy.preloadImage(this.gif.id, this.gif.images.downsized.url)
      .subscribe(() => {
        console.log(`preloaded ${this.gif.images.downsized.url}`);
      });
  }
}
