import { Injectable } from '@angular/core';

import * as $ from 'jquery';

@Injectable()
export class PageLoaderService {

  constructor() { }

  setLoading(enable: boolean) {
    const body = $('body');
    if (enable) {
      $(body).addClass('m-page--loading-non-block');
    } else {
      $(body).removeClass('m-page--loading-non-block');
    }
  }

}
