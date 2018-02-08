import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { AuthService } from './core/auth/services/auth.service';
import { PageLoaderService } from './core/components/page-loader/page-loader.service';
import { ThemeHelperService } from './layout/theme-helper.service';
import { LoggerService } from './core/base/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private authService: AuthService, private logger: LoggerService,
    private themeHelper: ThemeHelperService, private pageLoader: PageLoaderService) { }

  ngOnInit() { }

  ngAfterViewInit() {

    this.router.events.subscribe((route) => {
      /* Route Navigation Start */
      if (route instanceof NavigationStart) {
        this.pageLoader.setLoading(true);

        this.themeHelper.handleMobileLayout();
        this.themeHelper.scrollTop();
        this.themeHelper.hideVisiblePopover();
      }

      /* Route Navigation End */
      if (route instanceof NavigationEnd) {
        this.themeHelper.initRequiredJs();
        this.themeHelper.animateContent();

        this.pageLoader.setLoading(false);

      //  this.logger.log('NavigationEnd => route.url => ', route.url);

      }

      /* Route Navigation Error */
      if (route instanceof NavigationError) {
        this.pageLoader.setLoading(false);
      }

    });

  }
}

