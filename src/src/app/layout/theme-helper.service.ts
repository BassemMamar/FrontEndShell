import * as $ from 'jquery';

import { Injectable } from '@angular/core';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;
@Injectable()
export class ThemeHelperService {
    private _mApp: any;
    private _mUtil: any;
    private _mLayout: any;

    constructor() {
        this._mApp = mApp;
        this._mUtil = mUtil;
        this._mLayout = mLayout;
    }

    public get mApp(): any {
        return this._mApp;
    }
    public get mUtil(): any {
        return this._mUtil;
    }
    public get mLayout(): any {
        return this._mLayout;
    }

    handleMobileLayout() {
        // handle mobile layout
        (<any>this.mLayout).closeMobileAsideMenuOffcanvas();
        (<any>this.mLayout).closeMobileHorMenuOffcanvas();
    }

    scrollTop() {
        // register scroll top
        (<any>mApp).scrollTop();
    }


    hideVisiblePopover() {
        // hide visible popover
        const temp = (<any>$('[data-toggle="m-popover"]'));
        if (temp && temp.length > 0) {
            temp.popover('hide');
        }
    }

    initRequiredJs() {
        // init required js
        (<any>mApp).init();
        (<any>mUtil).init();
    }

    animateContent() {
        // content m-wrapper animation
        const animation = 'fadeIn animated'; // 'm-animate-fade-in-up';
        $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
            $('.m-wrapper').removeClass(animation);
        }).removeClass(animation).addClass(animation);
    }

    loadStyles(tag, src) {
        if (Array.isArray(src)) {
            $.each(src, function (k, s) {
                $(tag).append($('<link/>').attr('href', s).attr('rel', 'stylesheet').attr('type', 'text/css'));
            });
        } else {
            $(tag).append($('<link/>').attr('href', src).attr('rel', 'stylesheet').attr('type', 'text/css'));
        }
    }

    /**
    * Set title markup
    * @param title
    */
    setTitle(title) {
        $('.m-subheader__title').text(title);
    }

    /**
    * Breadcrumbs markup
    * @param breadcrumbs
    */
    setBreadcrumbs(breadcrumbs) {
        if (breadcrumbs) {
            $('.m-subheader__title').addClass('m-subheader__title--separator');
        }

        let ul = $('.m-subheader__breadcrumbs');

        if ($(ul).length === 0) {
            ul = $('<ul/>').addClass('m-subheader__breadcrumbs m-nav m-nav--inline')
                .append($('<li/>').addClass('m-nav__item')
                    .append($('<a/>').addClass('m-nav__link m-nav__link--icon')
                        .append($('<i/>').addClass('m-nav__link-icon la la-home'))));
        }

        $(ul).find('li:not(:first-child)').remove();
        $.each(breadcrumbs, function (k, v) {
            const li = $('<li/>').addClass('m-nav__item')
                .append($('<a/>').addClass('m-nav__link m-nav__link--icon').attr('routerLink', v.href).attr('title', v.title)
                    .append($('<span/>').addClass('m-nav__link-text').text(v.text)));
            $(ul).append($('<li/>').addClass('m-nav__separator').text('-')).append(li);
        });
        $('.m-subheader .m-stack__item:first-child').append(ul);
    }

    bodyClass(strClass) {
        $('body').attr('class', strClass);
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
