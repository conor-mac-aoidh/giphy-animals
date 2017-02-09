import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiphyApiService } from './services/giphy-api.service';
import { BodyComponent } from './body/body.component';

@NgModule({
  imports: [ CommonModule ],
  providers: [ GiphyApiService ],
  declarations: [ BodyComponent ],
  exports: [ BodyComponent ]
})
export class CoreModule { }
