import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule, PaginationModule } from 'ng2-bootstrap';
import { WaveComponent } from 'ng-spin-kit/app/spinner/wave.component';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

import { GiphyApiService } from './services/giphy-api.service';
import { BodyComponent } from './body/body.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [ GiphyApiService ],
  declarations: [
    WaveComponent,
    BodyComponent
  ],
  exports: [ BodyComponent ]
})
export class CoreModule { }
