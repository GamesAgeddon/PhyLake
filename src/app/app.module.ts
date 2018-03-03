import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

const GlobalRippleConfig: RippleGlobalOptions = {
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: GlobalRippleConfig} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
