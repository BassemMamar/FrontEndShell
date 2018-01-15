/* Angular Imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

/* Core Module Imports */
import { CoreModule } from './core/core.module';

/* Core Module Imports */
import { SharedModule } from './shared/shared.module';

/* App Imports */
import { AppRoutingModule, appRoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppRoutingModule,
    CoreModule, // this will provide  RouterModule, and BrowserModule for us to use
    SharedModule,

    // later for service-worker
    //  environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  declarations: [
    AppComponent,
    appRoutingComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
