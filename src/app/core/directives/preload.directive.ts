import { Directive, HostListener, Input, OnInit, ElementRef } from '@angular/core';

import { Gif } from '../models/gif';
import { GiphyApiService } from '../services/giphy-api.service';

@Directive({
  selector: '[appPreload]'
})
export class PreloadDirective implements OnInit {

  static images: Map<string, void> = new Map();

  @Input('appPreload') public gif: Gif;

  constructor(private giphy: GiphyApiService,
    private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.src = this.gif.images.fixed_width.url;
  }

  @HostListener('mouseover') public mouseover(): void {
    const url = this.gif.images.downsized.url;
    if (!PreloadDirective.images.has(url)) {
      this.giphy.preloadImage(url)
        .subscribe(() => {
          PreloadDirective.images.set(url);
          console.log(`preloaded ${url}`);
        });
    }
  }
}
