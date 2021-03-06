# Frontend Shell

This project is an [Angular](https://angular.io/) `5.0.0` project, and was generated with [Angular CLI](https://github.com/angular/angular-cli) version `1.5.5`.

# Table of contents #

<!--ts-->
   * [Quick Start](#quick-start)
   * [File Structure](#file-structure)
   * [Key Modules](#key-modules)
      * [Core Module](#core-module)
      * [Shared Module](#shared-module)
      * [Layout Module](#layout-module)
   * [Theme Folder](#theme-folder)
   * [FAQs](#faqs)
      * [Authentication/Authorization](#how-to-apply-authentication-or-authorization-in-an-angular-routes-)   
      * [BlockUI](#how-to-use-block-ui-in-my-component-)   
      * [Toastr](#how-to-use-toastr-in-my-component-)   
      * [Alert Notification](#how-to-use-alert-notification-in-my-component-)   
      * [Modal](#how-to-use-modal-in-my-component-)   
      * [Sweetalert2](#how-to-use-sweetalert2-in-my-component-)   
   * [Resources](#resources)      
<!--te-->


# Quick Start #

**Make sure you have Node version >= 6.x and NPM >= 5.x**
```bash
# clone our repo

# change directory to our repo
cd FrontendShell/src

# WINDOWS only. In terminal as administrator
npm install -g node-pre-gyp typescript @angular/cli gulp-cli @compodoc/compodoc 

# install the repo with npm
npm install

# start the server
npm start

# build 
npm run build

# documentaion 
npm run doc

```
The app will be automatically launched in [http://localhost:300/home](http://localhost:3000/home).

---


# File Structure #

We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
Onboarding Suite v2/
 ├──e2e/                                        * End to end testing goes here.
 ├──src/                                        * Our source files that will be compiled to javascript.
 |   ├──main.ts                                 * Our entry file for our browser environment.
 |   ├──index.html                              * Index.html: where we generate our index page.
 |   ├──styles.scss                             * Styles.scss: where we add our global styles, and also import other style files.
 |   ├──polyfills.ts                            * Our polyfills file to support older browsers.
 │   │
 │   ├──app/                                    * WebApp: folder.
 │   │   ├──app.module.ts                       * Main angular app module (bootstrapping module).
 │   │   ├──app-routing.module.ts               * Main app routing module, imported as `forRoot` to create app `Route` service.
 │   │   ├──app.component.ts                    * Main app component, where route navigations lifecycle handle.
 │   │   │
 │   │   ├──core/                               * Drives the angular application, hold singliton services like auth.
 │   │   ├──shared/                             * Resuable module which used across multiple modules and areas of the application.
 │   │   ├──layout/                             * Main components like `Header`, `Footer`, `breadcrumbs` etc.. 
 │   │   ├──dashboard/                          * Default module where home page goes.
 │   │   └──feature-modules/                    * Main app feature modules which will lazy load.
 │   │       ├──business-account-management/    * Business account management module. 
 │   │       ├──capture-studio/                 * Capture studio module. 
 │   │       ├──investigation-studio/           * Investigation studio module. 
 │   │       └──journey-definition/             * Journey Definition module.    
 │   │
 │   ├──assets/                                 * Static assets are served here
 │   │   ├──images/                             * Our images 
 │   │   ├──theme-compiled-files/               * Assets like js, css and fonts generated after our theme compilation 
 │   │   └──web.config                          * Required for iis re-write URLs.
 │   │
 │   └──environments/                           * (Development/ staging/ Production) configurations.
 │ 
 ├──theme/                                      * Our Theme Source.
 |   ├──src/                                    * Source theme files including js, media, sass etc...
 |   └──tools/                                  * Tools help you customize theme and generate compiled version,
 |       |                                        and stored under `assets/theme-compiled-files` directory.
 │       └──conf/                               * Theme angular version configuration file where specify what library you need to include.
 │       └──gulp/                               * Gulp tasks to compile/ bundle theme assets.   
 │
 │
 │
 ├──.angular-cli.json                           * Angular cli configuratino file.
 ├──tslint.json                                 * Typescript lint config.
 ├──gulpfile.js                                 * Gulp main file.
 ├──tsconfig.json                               * Typescript config used outside webpack.
 ├──package.json                                * what npm uses to manage its dependencies.
 └──webpack.config.js                           * webpack main configuration file.

** More details is comming down. 
```


---

# Key Modules  #

## Core Module
`CoreModule` contains code that will be used to instantiate the app and load some core functionality. In the other words, `CoreModule` drives the Angular application.

What goes in `CoreModule`?

The clearest and most important use of the CoreModule is the place to put global HTTP Interceptor, Authentication Guard and Authentication Service. The idea is to make sure only one instance of those services will be created across the entire app. The CoreModule, by convention, is only included in the entire app once in AppModule (only in the import property of the `@NgModule()` decorator inside the main app.module.ts, not in any other module's import) and this will ensure services inside it will be only created once in the entire app. This is especially important since we intend to lazy-load our feature modules. Since lazy-loaded modules are loaded on demand (eg when you access the route using the lazy-loaded feature), you could end up creating new instances of supposedly singleton services if you don't put them in CoreModule.

Important single use components/classes  also go in the CoreModule. Good candidates are global components that go in your main AppComponent. This allows you to keep this global component in one spot and make sure there's only have one copy of it across the app.

The CoreModule also used to export any third party module that is required in the AppModule. The idea is to keep AppModule as lean as possible.

### Core Module File Structure
```
core/
 ├──auth/                                       * Authentication module which handle login, logout, authenticate user, authorize areas, interceptor http requests and responses
 |   ├──callback/                               * Simple component to handle oidc-client login redirect callback.
 |   ├──guards/                                 * Contain authorized/authenticated guards.
 |   ├──interceptor/                            * Intercept http requests to inject access_token.
 |   ├──pages-access-authorization/             * Contain our app pages access roles structure and `authorization.service` which used to check user authority to access any page.
 │   ├──services/                               * Where main app auth service and exist.
 │   │
 │   └──auth.module                             * Auth module file.
 │ 
 ├──base/                                       * Abstract services which can be reused in any other application (drag and drop :D ). 
 |   ├──global-error-handler/                   * Global unexpected app error handler.
 |   ├──http-timing-interceptor/                * Http interceptor which calculate http requsts time cost.
 |   ├──lazy-loading/                           * Contain preloading strategy service to support lazy-loaded modules.
 |   ├──logger/                                 * Logging service to log into the console.
 |   ├──module-import-guard/                    * Gurds to ensure that specific module not being imported more that once, important for `CoreModule`.
 |   ├──default-http-request-options/           * Default http request options.
 |   ├──storage/                                * Storage module to store informations in store like cookies.
 |   ├──url-case-insensitive/                   * Contain angular url matcher to apply urls case insensitive.
 |   └──utils/                                  * Service to provide Common javascript functionality.  
 │ 
 ├──components/                                 * Main app components like 404, 401, 500 and page loader.
 │
 ├──services/                                   * Main app required services. 
 |   ├──communication/                          * Handle sub-domain case and provide multi api urls. 
 |   └──http-error-handling/                    * Centralize http error response handler.
 │ 
 └──third-party-modules/                        * Place to import any future 3rd party module want to use. 
 │
 ├──core-routing.module                         * Core routing module to define route configurations to it's components. 
 └──core.module                                 * Core module file.

```


---


## Shared Module

`SharedModule` contains directives and components which may be used across multiple modules and areas of the application.

What goes in `SharedModule`?

SharedModule similarly contains code that will be used across your app and Feature Modules. But the difference is that you will import this SharedModule into the specific Feature Modules as needed.

Common templates components (like `Alert`, `BlockUI`, `Toastr` etc...) should also go in the SharedModule.
Commonly used pipes (ie filters) and directives should go in your SharedModule, too. Prime examples would be custom string/date filters.

In the SharedModule's main file (eg shared.module.ts), might also export the commonly used Angular modules, for example:

* `CommonModule` from `@angular/common` for the `*ngIf` structure directive.
* `FormsModule` from `@angular/forms` for the `[(ngModel)]` directive.

So they can be easily used across your app, without importing them in every Feature Module. 
 > This might be introduce unnecessary loading speed if you don't use those modules/directives a lot. If that's the case, you might want to do it the old fashioned way and import these Angular modules only in the Feature Modules that use them.


### Shared Module File Structure ###
```
shared/
 ├──components/                                 * Shared componenrs declaration.
 ├──directives/                                 * Shared directives declaration. 
 ├──pipes/                                      * Shared pipes declaration. 
 |
└──shared.module                                * Shared module file.

```

---

## Layout Module ##

`LayoutModule` contains common template parts which may be used in any other feature module's base view. It will be imported to any module if needed.

What goes in `SharedModule`?

`LayoutModule` contains components provide main html parts like Header, Footer, Shared Menu etc...

* `HeaderNavTopComponent` display application logo, provide links to navigate to main app modules and popover menu for login/logout stuff.
* `HeaderNavBottomComponent` independently read the current module navigations, then appropriately displays the links in the navigation bar.
* `BreadcrumbsComponent` independently display current breadcrumb state for the page (for the  future).
* `FooterComponent` html footer template.
* `theme-helper.service` An angular service to handle our template initialization requirments code.


#### __theme-helper__ service details:
`theme-helper.service` is an angular service to handle our template initialization requirments code like `handleMobileLayout`, `scrollTop`, `mApp init`, `mUtil init`, `animateContent`. also it provides main theme variables `mApp`,`mUtil` and `mLayout`. this service is being used in the main `app.component`.

What is the main theme variables?

 **_mApp_**:

  App is Metronic's base javascript class, and globally available within the theme that handles all the initializaitons of base components such as bootstrap popover and tooltips, scrollable contents(using Custom Scroll plugin), etc...

  you can see source code here `theme/src/js/framework/base/app.js`.
 

 **_mUtil_**:

  Util is Metronic's base utility helper class, and globally available within the theme
 
  you can see source code here  `theme/src/js/framework/base/util.js`.


 **_mLayout_**:
 
  you can see source code here `theme/src/js/demo/demo5/base/layout.js`.




*_Notes:_*

> It's not part of `SharedModule` because it contain reusable components for html parts, logically `AlertComponents` not like `HeaderComponents`.

> It's not part of `CoreModule` to support flexibility to acustomize base template in each feature module, for example i want to show header in one module and don't want in the other.  


### Layout Module File Structure
```
Layout/
 ├──header-nav-top/                                 * Header top template which contains login section.
 ├──header-nav-bottom/                              * Header bottom template which contains dynamic navigations for each feature module.
 ├──breadcrumbs/                                    * Breadcrumbs template /not ready for now/.
 ├──footer/                                         * Footer template.
 |
 ├──theme-helper.service                            * An angular service to handle our template initialization requirments code.
 └──Layout.module                                   * Layout module file.

```


---



# Theme Folder #

Theme folder contains theme source files like javascript, scss, images etc...

for more information about the template you can read there [metronic documentation](https://keenthemes.com/metronic/documentation.html).

* Files under `src/` were taken from `metronic_v5.0.6.1\metronic_v5.0.6.1\theme\angular\src`.
* Files under `tools/` were taken from `metronic_v5.0.6.1\metronic_v5.0.6.1\theme\angular\tools`.
* In the `tools/conf` directory there is two config files:
  * `conf.full.json` which contains all configurations as it declared by theme owner.
  * `conf.current.json` which contains what our app need at the moment, so when we need to apply new feature from theme we need to add it's requirments in this file as they declared in `conf.full.json`.


**How to customize theme?**

First read there documentation for more understanding, then you can do the change you want in js or scss files and compile them when you finish.

to compile theme files type:

```javascript
gulp build
```


to watch js files:

```javascript
gulp watch:js
```


to watch scss files:

```javascript
gulp watch:scss
```


---


# FAQs #

### How to apply authentication or authorization in an angular routes?

To secure our routes, there is two main Angular Guards `AuthenticatedGuard` and `AuthorizedGuard`.

**__AuthenticatedGuard:__**

This guards is responsible for checking if there is a user logged in or not, return true/false. 

To use this guard simply add it to `CanActivate` or `canActivateChild`:

```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    canActivate: [AuthenticatedGuard],
    canActivateChild: [AuthenticatedGuard],
    ...
  }
```


> Remember that `canActivate` is applied when trying to access the route it self, weather `canActivateChild` is applied when trying to access any child route, that's mean it will protect all module routes. 


**__AuthorizedGuard:__**

This guards is responsible for checking if the user has a right to access this route(or page). 

To use this guard simply add it to `CanActivate` or `canActivateChild`:

```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    canActivate: [AuthorizedGuard],
    canActivateChild: [AuthorizedGuard],
    ...
  }
```


> For Authorization part you need to provide more informations because we want to have  `Authorization`/`AccessLevel` in each page.

*What it's possible to authorize each single page?*

After user is logged in, the App will ask for `pagesAccessAuthorizationInfo` from an api (for now it's fixed in the client) which contain all information for each page:

```js
[
    // BusinessAccountManagement module
    {
        name: FrontendShell.BusinessAccountManagement.Name,
        rolesAccess: [
            { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.BusinessAccountManagement.Pages.ListBusiness,
                rolesAccess: [
                    { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess },
                   // { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.ReadOnly }
                ]
            },
            {
                name: FrontendShell.BusinessAccountManagement.Pages.EditBusiness,
                rolesAccess: [
                    { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess },
                   // { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.ReadOnly }
                ]
            }
        ]
    },

    // Investigation module
    {
        name: FrontendShell.InvestigationStudio.Name,
        rolesAccess: [
            { role: UserRole.Investigator, accessLevel: AccessLevel.FullAccess },
            { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.InvestigationStudio.Pages.RecentJourneys,
                rolesAccess: [
                    { role: UserRole.Investigator, accessLevel: AccessLevel.ReadOnly },
                    { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
                ]
            }
        ]
    },

    // CaptureStudio module
    {
        name: FrontendShell.CaptureStudio.Name,
        rolesAccess: [
            { role: UserRole.ScanningUser, accessLevel: AccessLevel.FullAccess },
            { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
        ],
        pages: []
    },

    // JourneyDefinition module
    {
        name: FrontendShell.JourneyDefinition.Name,
        rolesAccess: [
            { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
        ],
        pages: []
    }

]
```

*_Notice that:_*
- `pagesAccessAuthorizationInfo` is an array ob objects.
- Each object refers to module(feature module).
- Module object contains of:
  * `name` this module name.
  * `rolesAccess` default of pair role/accessLevel for this module pages
  * `pages` array of this module's pages:
    * `name` page name.
    * `rolesAccess` pair of role/accessLevel for this specific page.

So `AuthorizedGuard` will depend on this information to determine if the user has right to access the page or not, and all what you need to do is to pass `moduleName` and `pageName` informations.

**__Examples:__**
<dl>
  <dt>General case is to provide `pageName` and optional `moduleName` for each route(page) we want to authorize it:</dt>
</dl>


```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    children: [
      {
        path: 'RecentJourneys',
        component: RecentJourneysComponent,
        canActivate: [AuthorizedGuard],
        data: {
          moduleName: FrontendShell.InvestigationStudio.Name, // this is optional
          pageName: FrontendShell.InvestigationStudio.Pages.RecentJourneys
        }
      }
    ]
  }
```


*_In case both module name and page name are provided:_*
+ First get the matched module information (throw exception if there is no such a module).
+ Second get matched pages in this module.
+ As a result will have a collection of matched pages in one module(should be a collection of one page and throw an exception if not).
+ Finally reach rolesAccess array and extract an array of roles from it for this page.


<dl>
  <dt>Another case is to provide just `pageName` for the route(page) we want to authorize it:</dt>
</dl>
 

```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    children: [
      {
        path: 'RecentJourneys',
        component: RecentJourneysComponent,
        canActivate: [AuthorizedGuard],
        data: {
          pageName: FrontendShell.InvestigationStudio.Pages.RecentJourneys
        }
      }
    ]
  }
```

*_In case Just page name is provided:_*
+ In this case will try to get any matched page in the all modules.
+ Do some validation(should exist in one module and throw an exception if not)
+ As a result will have a collection of matched pages in one module(should be a collection of one page and throw an exception if not).
+ Finally reach rolesAccess array and extract an array of roles from it for this page.


<dl>
  <dt>Another case is to provide just `moduleName` for the route(page) we want to authorize it:</dt>
</dl>


```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    children: [
      {
        path: 'RecentJourneys',
        component: RecentJourneysComponent,
        canActivate: [AuthorizedGuard],
        data: {
          moduleName: FrontendShell.InvestigationStudio.Name
        }
      }
    ]
  }
```

*_In case Just module name is provided:_*
+ In this case will try to get default rolesAccess specified for the module it self and extract an array of roles from it for this page.


<dl>
  <dt>Another case is to not provide nither `moduleName` nor `pageName` for the route(page) we want to authorize it:</dt>
</dl>


```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    children: [
      {
        path: 'RecentJourneys',
        component: RecentJourneysComponent,
        canActivate: [AuthorizedGuard],
        data: {
        }
      }
    ]
  }
```

*_In case Nither module name nor page name is provided:_*
+ In this case will throw an exception with message: 'Can NOT check authority for unknown moduleName and pageName.'


<dl>
  <dt>Special case to provide `moduleName` for the route (as a parent) when you already know that the route including it's children has same authority:</dt>
</dl>


```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    canActivateChild: [AuthorizedGuard],
    data: {
      moduleName: FrontendShell.InvestigationStudio.Name
    },
    children: [
      {
        path: 'RecentJourneys',
        component: RecentJourneysComponent,
      },
      {
        ...
      }
    ]
  }
```

*_In case Module name for parent route is provided:_*
+ Remember that `canActivateChild` applied just when try to access any child route but NOT the route it self. 
+ In this case all the routes declared in the children section will have the same authority which is for `InvestigationStudio` module.
+ If you provide both module name and page name in the parent route, then all children routes will have this page's authority.
+ any data provided from child route will be ignored in the current implementaion.


*Keep In Mind that in our implementaion:*
> `CanActiviate` reads `moduleName` and `pageName` from current route's `data` object.

> `CanActiviateChild` reads `moduleName` and `pageName` from parent route's `data` object.


**__Access Level Resolver:__**

This service is responsible for providing `AccessLevel` value for the page according to the current user's roles.

AccessLevel is:
```js
enum AccessLevel {
    ReadOnly = 'ReadOnly',
    FullAccess = 'FullAccess'
}
```

To use this service simply add it to the route's `resolve` property:

```js
  {
    path: 'Investigation',
    component: InvestigationComponent,
    data: {
      moduleName: FrontendShell.InvestigationStudio.Name
    },
    children: [
      {
        path: 'RecentJourneys',
        component: RecentJourneysComponent,
        resolve: {
          accessLevel: AccessLevelResolver
        }
      }
    ]
  }
```


> `AccessLevelResolver` service will try to reach `moduleName` and `pageName` from the route it specified in, if doesn't find one or both of them, then it will try to reach missed one in the parrent route. 

---


### How to use block ui in my component?

let's say that we want to block add user div in the `user.component`:

<dl>
  <dt>In the `user.component.ts` there are two ways to control when to start/stop blocking:</dt>
</dl>

*1) Declare a variable with the `@BlockUI()` decorator:*

```js
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockUITemplateComponent } from 'shared/components/block-ui/block-ui-template.component';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // Create an instance from our block ui template
  blockTemplate = BlockUITemplateComponent;

  @BlockUI('block-add-user') blockAddUser: NgBlockUI;
  
  constructor(){}

  addUser() {
  this.blockAddUser.start();
  this.userService.add(userObject)
    .subscribe(
     (res) => {

       // do stuff when add user success
       this.blockAddUser.stop();
     },
     (error) => {
       
       // do stuff when add user failed
       this.blockAddUser.stop();
     });
  }

}
 ```


*2) Using the `BlockUIService` which allows you to easily target multiple instance:*

```js
import { BlockUIService, NgBlockUI } from 'ng-block-ui';
import { BlockUITemplateComponent } from 'shared/components/block-ui/block-ui-template.component';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // Create an instance from our block ui template
  blockTemplate = BlockUITemplateComponent;

  constructor(private blockUIService: BlockUIService){}

  addUser() {
  this.blockUIService.start('block-add-user');
  this.userService.add(userObject)
    .subscribe(
     (res) => {

       // do stuff when add user success
       this.blockUIService.stop('block-add-user');
     },
     (error) => {
       
       // do stuff when add user failed
       this.blockUIService.stop('block-add-user');
     });
  }

}
 ```


*_Notes:_*
* You can pass optional message with `.start()`.
* `BlockUIService` can start/stop many instances by passing array of there names: `.start(['..'])`

<dl>
  <dt>In the `user.component.html` add `blockUI ` directive to that div with an appropriate parameters:</dt>
</dl>

```html
<div *blockUI="'block-add-user'; template:blockTemplate; message:'Proccessing... '">
    // add user section
    ...
</div>
``` 


*_Notes:_*
* As a convintion let's always add name prefix `block-` for `*blockUI` name.
* `blockTemplate` is an instance reference of our custom block ui component template (property in the `home.component.ts`), if you don't provide it then default style will be applied, 
and for this case i import custom css style in the style.scss '@import "~app/shared/components/block-ui/block-ui-template.component.scss";'
* `message` is an optional message to show during blocking.
* Keep in mind to use [`AfterViewInit`](https://angular.io/api/core/AfterViewInit) Lifecycle hook when needed.


> We depend on [ng-block-ui](https://github.com/kuuurt13/ng-block-ui) library for blocking ui, for more details read there documentaion.


---


### How to use toastr in my component?

let's say that we want to show toastr message for adding user result in the `user.component`:

```js
import { ToastrService } from 'shared/components/toastr/toastr.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private toasrtService: ToastrService){}

  addUser() {
  this.userService.add(userObject)
    .subscribe(
     (res) => {

       // do stuff when add user failed
       // Display a success toast, with a title
       this.toasrtService.success('User has been added successfully!', 'Done');
     },
     (error) => {
       
       // do stuff when add user failed
       // Display an error toast, with a title
       this.toasrtService.error(error.message, 'Opps!');
     });
  }

}
 ```


*_Notes:_*
* You can override global options, for example:
    `this.toasrtService.success('We do have the Kapua suite available.', null, { timeOut: 2000 });`
* You can remove/clear all current toasts:  
    `this.toasrtService.remove();`, `this.toasrtService.clear();`.


> We depend on [toastr](https://github.com/CodeSeven/toastr) library, for more details read there documentaion.


---


### How to use alert notification in my component?

let's say that we want to show fixed alert for adding user result in the `user.component`:

<dl>
  <dt>In the `user.component.ts`:</dt>
</dl> 

```js
import { AlertService } from 'shared/components/alert/alert.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private alertService: AlertService){}

  addUser() {
  this.userService.add(userObject)
    .subscribe(
     (res) => {

       // do stuff when add user failed
       // Display a success fixed alert, with a title
       this.alertService.success('User has been added successfully!', 'Done');
     },
     (error) => {
       
       // do stuff when add user failed
       // Display an error toast, with a title
       this.alertService.error(error.message, 'Opps!');

     });
  }

}
 ```

<dl>
  <dt>In the `user.component.html` add `shrd-alert` element where you want to show alert:</dt>
</dl>

```html
<shrd-alert></shrd-alert>
```


*_Notes:_*
* You can declare alert element with an id, and then show message in that specific alert:


```html
<shrd-alert [id]="'root'"></shrd-alert>
``` 

and in the component you can pass option to push choose that alert:


```js
this.alertService.success(message, title, { hostId: 'root' });
```

Declare an alert with `id` is the way if you want to have Golbal alert in one central place to show messages in the module base template.


*_Notes:_*
* You can specify `showDuration` time to show alert, and remove it after this time:

```js
this.alertService.success(message, title, { showDuration: 5000 }); // by default showDuration is 0
```


*_Notes:_*
* If you didn't provide `showDuration` option, or you provide `showDuration: 0 `, the alert will not being removedat all.
* `showDuration` is millisecond.


---


### How to use Modal in my component?

let's say that we want to show some formation in a modal in the `user.component`:

<dl>
  <dt>In the `user.component.ts`:</dt>
</dl>

```js
import { ModalComponent } from 'shared/components/modal/modal.component';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalComponent) private modal: ModalComponent;

  constructor(){}

  ngAfterViewInit(): void {
    this.registerModalEvents();
  }

  showModal() {
    this.modal.show();
  }

  save(saved: boolean) {
    if (saved) {
      this.modal.hide();
    }
  }

// https://v4-alpha.getbootstrap.com/components/modal/#events
  registerModalEvents() {
    $(`#${this.modal.id}`).on('hidden.bs.modal', (e) => {
      // do something...
    });
  }

}
 ```


*_Notes:_*
* Use `AfterViewInit` life cycle if you need to do sth with `@ViewChild` instance.

<dl>
  <dt>In the `user.component.html`:</dt>
</dl>

```html
<shrd-modal [id]="'exampleModal'" [title]="'Modal title'" (onSaved)="save($event)">
    // modal content goes here...
    ...
</shrd-modal>
``` 

*_Notes:_*
* `onSaved` event is triggered when use click on `save` button, so that you can do what you need to do in this case.
* You can inject any content you want, even our shared component like `<shrd-alert [id]="'modal-alert'"></shrd-alert>`.


> We depend on [Bootstrap Modal](https://v4-alpha.getbootstrap.com/components/modal/), for more details read there documentaion.


---


### How to use sweetalert2 in my component?

let's say that we want to show sweet alert for adding user result in the `user.component`:


```js
// ES6 Modules or TypeScript
import swal from 'sweetalert2';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(){}

  addUser() {
  this.userService.add(userObject)
    .subscribe(
     (res) => {

       // do stuff when add user failed
       // Display a sweet-alert2 success
       swal('Done', 'User has been added successfully!', 'success');
     },
     (error) => {
       
       // do stuff when add user failed
       // Display a sweet-alert2 error
      // swal('Oops!', error.message, 'error');
     });
  }

}
 ```


> We depend on [sweetalert2](https://github.com/sweetalert2/sweetalert2) library, for more details read there documentaion.


---

# Resources
 *  Angular documentaion
    * https://angular.io/docs
 *  Angular styleguide (IMPORTANT)
    * https://angular.io/guide/styleguide
 *  Angular path on pluralsight
    * https://www.pluralsight.com/paths/angular
 *  ReactiveX
    * https://github.com/ReactiveX/rxjs
 *  Angular CLI (wiki is very helpfull)
    * https://cli.angular.io/    
 *  Globals scripts/ Third party libraries
    * https://github.com/angular/angular-cli/wiki/stories-global-scripts
    * https://github.com/angular/angular-cli/wiki/stories-third-party-lib
 *  Bootstrap-v4
    * https://v4-alpha.getbootstrap.com/getting-started/introduction/    
