import { NgModule } from '@angular/core';

import { HttpClientInMemoryWebApiModule, InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';
import { InMemService } from './in-memory-db/in-mem.service';

import { environment } from '../../../environments/environment';

const options: InMemoryBackendConfigArgs = {
  apiBase: 'api/JourneyDefinitions/',
  rootPath: '//localhost:8084/'
};
@NgModule({
  imports: [
    !environment.production ? HttpClientInMemoryWebApiModule.forRoot(InMemService, options) : [],

  ],
  exports: [

  ],
  declarations: [],
  providers: [],
})
export class ThirdPartyModule { }
