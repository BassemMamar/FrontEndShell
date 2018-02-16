import { Injectable } from '@angular/core';

import * as $ from 'jquery';
import { ThemeHelperService } from '../../../layout/theme-helper.service';

@Injectable()
export class PageLoaderService {

  constructor(private themeHelperService: ThemeHelperService) { }

  setLoading(enable: boolean) {
    const body = $('body');
    if (enable) {
      // this.themeHelperService.mApp.blockPage({ overlayColor: '#000000', type: 'loader', state: 'success', size: 'lg' });
      $(body).addClass('m-page--loading-non-block');
    } else {
      // this.themeHelperService.mApp.unblockPage();
      $(body).removeClass('m-page--loading-non-block');
    }
  }

}
