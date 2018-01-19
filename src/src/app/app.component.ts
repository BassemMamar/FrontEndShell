import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { Helpers } from './layout/helpers';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private router: Router) { }
  ngOnInit() {

    this.router.events.subscribe((route) => {
      /* Route Navigation Start */
      if (route instanceof NavigationStart) {
        (<any>mLayout).closeMobileAsideMenuOffcanvas();
        (<any>mLayout).closeMobileHorMenuOffcanvas();
        (<any>mApp).scrollTop();
        Helpers.setLoading(true);
        // hide visible popover
        (<any>$('[data-toggle="m-popover"]')).popover('hide');
      }

      /* Route Navigation End */
      if (route instanceof NavigationEnd) {
        // init required js
        (<any>mApp).init();
        (<any>mUtil).init();
        Helpers.setLoading(false);
        // content m-wrapper animation
        const animation = 'm-animate-fade-in-up';
        $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
          $('.m-wrapper').removeClass(animation);
        }).removeClass(animation).addClass(animation);
      }

      /* Route Navigation Error */
      if (route instanceof NavigationError) {
        Helpers.setLoading(false);
      }

    });

  }
}


/* mApp
 * App is Metronic's base javascript class defined in src/js/framework/base/app.js
 * and globally available within the theme that handles all the initializaitons of base components
 * such as bootstrap popover and tooltips, scrollable contents(using Custom Scroll plugin), etc
 * theme/src/js/framework/base/app.js
 */

/* mUtil
 * Util is Metronic's base utility helper class defined in src/js/framework/base/util.js
 * and globally available within the theme
 * theme/src/js/framework/base/util.js
 */

 /* mLayout
 * theme/src/js/demo/demo5/base/layout.js
 *
 *
 */
