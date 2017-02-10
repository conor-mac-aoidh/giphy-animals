import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule, PaginationModule } from 'ng2-bootstrap';
import { WaveComponent } from 'ng-spin-kit/app/spinner/wave.component';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

import { GiphyApiService } from './services/giphy-api.service';
import { BodyComponent } from './body/body.component';
import { PreloadDirective } from './directives/preload.directive';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [ GiphyApiService ],
  declarations: [
    WaveComponent,
    BodyComponent,
    PreloadDirective
  ],
  exports: [ BodyComponent ]
})
export class CoreModule { }
