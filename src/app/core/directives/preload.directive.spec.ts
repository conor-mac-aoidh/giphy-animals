/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { PreloadDirective } from './preload.directive';
import { By } from '@angular/platform-browser';

import { CoreModule } from '../core.module';
import { Gif } from '../models/gif';
import { GiphyApiService } from '../services/giphy-api.service';

// dummy/test component
@Component({
  template: `<img [appPreload]="gif" />`
})
class TestComponent {
  public gif = <Gif>{
    id: 'test',
    images: {
      fixed_width: {
        url: 'example-1'
      },
      downsized: {
        url: 'example-2'
      }
    }
  };
}

describe('PreloadDirective', () => {
  let image: any;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let preloadSpy: jasmine.Spy;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, PreloadDirective ],
      imports: [ HttpModule ],
      providers: [ GiphyApiService ]
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // get PreloadDirective in DOM
    image = fixture.debugElement.queryAll(By.directive(PreloadDirective))[0];
  }));

  beforeEach(inject([GiphyApiService], (giphyApi: GiphyApiService) => {
    preloadSpy = spyOn(giphyApi, 'preloadImage');
  }));

  it('should create an instance', () => {
    const directive = new PreloadDirective();
    expect(directive).toBeTruthy();
  });

  it('should initialise the directive on the input', () => {
    expect(image).toBeTruthy();
  });

  it('should set the image src on init', () => {
    expect(image.nativeElement.src.includes('example-1')).toBeTruthy();
  });

  it('should preload the image on mouseover', () => {
    const event = new Event('mouseover');
    image.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(preloadSpy).toHaveBeenCalledWith('test', 'example-2');
  });

});
