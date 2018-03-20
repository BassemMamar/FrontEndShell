import { NgModule } from '@angular/core';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemService } from './in-memory-db/in-mem.service';
import { environment } from '../../../environments/environment';


@NgModule({
  imports: [
    !environment.production ? HttpClientInMemoryWebApiModule.forRoot(InMemService) : [],
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ThirdPartyModule { }
