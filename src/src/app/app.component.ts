import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { Helpers } from './layout/helpers';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private _router: Router) { }
  ngOnInit() {

    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        (<any>mLayout).closeMobileAsideMenuOffcanvas();
        (<any>mLayout).closeMobileHorMenuOffcanvas();
        (<any>mApp).scrollTop();
        Helpers.setLoading(true);
        // hide visible popover
        (<any>$('[data-toggle="m-popover"]')).popover('hide');
      }
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
    });

  }
}
