import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features.module';
import { AppRoutingModule, appRoutingComponents } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    appRoutingComponents
  ],
  imports: [
    AppRoutingModule,
    CoreModule, // this will provide CommonModule, RouterModule, FormsModule and BrowserModule for us to use
    FeaturesModule,

    // later for service-worker
    //  environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
