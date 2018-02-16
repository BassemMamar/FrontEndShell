# Frontend Shell v2

This project is an [Angular](https://angular.io/) `5.0.0` project, and was generated with [Angular CLI](https://github.com/angular/angular-cli) version `1.5.5`.


### Quick start
**Make sure you have Node version >= 6.x and NPM >= 5.x**
```bash
# clone our repo
git clone  http://sc.corp.idscan.com:8080/tfs/SaaS/FrontendShell/_git/FrontendShell-v2

# change directory to our repo
cd FrontendShell-v2/src

# WINDOWS only. In terminal as administrator
npm install -g node-pre-gyp typescript @angular/cli gulp-cli @compodoc/compodoc 

# install the repo with npm
npm install

# start the server
npm start

# build 
npm run build

```
The app will be automatically launched in [http://localhost:3000/home](http://localhost:3000/home).



## File Structure
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


# Key Modules

## CoreModule
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


### SharedModule

`SharedModule` contains directives and components which may be used across multiple modules and areas of the application.

What goes in `SharedModule`?

SharedModule similarly contains code that will be used across your app and Feature Modules. But the difference is that you will import this SharedModule into the specific Feature Modules as needed.

Common templates components (like `Alert`, `BlockUI`, `Toastr` etc...) should also go in the SharedModule.
Commonly used pipes (ie filters) and directives should go in your SharedModule, too. Prime examples would be custom string/date filters.

In the SharedModule's main file (eg shared.module.ts), might also export the commonly used Angular modules, for example:

* `CommonModule` from `@angular/common` for the `*ngIf` structure directive.
* `FormsModule` from `@angular/forms` for the `[(ngModel)]` directive.

so they can be easily used across your app, without importing them in every Feature Module. 
 > This might be introduce unnecessary loading speed if you don't use those modules/directives a lot; if that's the case, you might want to do it the old fashioned way and import these Angular modules only in the Feature Modules that use them.


### Shared Module File Structure
```
shared/
 ├──components/                                 * Shared componenrs declaration.
 ├──directives/                                 * Shared directives declaration. 
 ├──pipes/                                      * Shared pipes declaration. 
 |
 └──shared.module                                  * Shared module file.

```

### Layout Module

`LayoutModule` contains common template parts which may be used in any other feature module's base view. It will be imported to any module if needed.

What goes in `SharedModule`?

`LayoutModule` contains components provide main html parts like Header, Footer, Shared Menu etc...

* `HeaderNavTopComponent` display application logo, provide links to navigate to main app modules and popover menu for login/logout stuff.
* `HeaderNavBottomComponent` independently read the current module navigations, then appropriately displays the links in the navigation bar.
* `BreadcrumbsComponent` independently display current breadcrumb state for the page (for the  future).
* `FooterComponent` html footer template.
* `theme-helper.service` An angular service to handle our template initialization requirments code.

#### `theme-helper` service details:
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


Notes:

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


### Theme Folder

Theme folder contains theme source files like javascript, scss, images etc...

for more information about the template you can read there [metronic documentation](https://keenthemes.com/metronic/documentation.html).

* Files under `src/` were taken from `metronic_v5.0.6.1\metronic_v5.0.6.1\theme\angular\src`.
* Files under `tools/` were taken from `metronic_v5.0.6.1\metronic_v5.0.6.1\theme\angular\tools`.
* In the `tools/conf` directory there is two config files:
  * `conf.full.json` which contains all configurations as it declared by theme owner.
  * `conf.current.json` which contains what our app need at the moment, so when we need to apply new feature from theme we need to add it's requirments in this file as they declared in `conf.full.json`.

How to customize theme?

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



# Frontend Shell FAQs

### How to use block ui in my component?

let's say that we want to block add user div in the `user.component`:

** In the `user.component.ts` there are two ways to control when to start/stop blocking:

1) Declare a variable with the `@BlockUI()` decorator:

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


2) using the `BlockUIService` which allows you to easily target multiple instance:

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


* You can pass optional message with `.start()`.
* `BlockUIService` can start/stop many instances by passing array of there names: `.start(['..'])`


** In the `user.component.html` add `blockUI ` directive to that div with an appropriate parameters:

```html
<div *blockUI="'block-add-user'; template:blockTemplate; message:'Proccessing... '">
    // add user section
    ...
</div>
``` 
* As a convintion let's always add name prefix `block-` for `*blockUI` name.
* `blockTemplate` is an instance reference of our custom block ui component template (property in the `home.component.ts`), if you don't provide it then default style will be applied, 
and for this case i import custom css style in the style.scss '@import "~app/shared/components/block-ui/block-ui-template.component.scss";'
* `message` is an optional message to show during blocking.


> We depend on [ng-block-ui](https://github.com/kuuurt13/ng-block-ui) library for blocking ui, for more details read there documentaion.


### How to use toastr in my component?

let's say that we want to show toastr message for adding user result in the `user.component`:

```js
import { ToasrtService } from 'shared/components/toastr/toasrt.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private toasrtService: ToasrtService){}

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


* You can override global options, for example:
    `this.toasrtService.success('We do have the Kapua suite available.', null, { timeOut: 2000 });`
* You can remove/clear all current toasts:  
    `this.toasrtService.remove();`, `this.toasrtService.clear();`.



> We depend on [toastr](https://github.com/CodeSeven/toastr) library, for more details read there documentaion.


### How to use alert notification in my component?

let's say that we want to show fixed alert for adding user result in the `user.component`:

** In the `user.component.ts` 

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

** In the `user.component.html` add `shrd-alert` element where you want to show alert:

```html
<shrd-alert></shrd-alert>
```

Notes:
* You can declare alert element as a golbal alert:

```html
<shrd-alert [forRoot]="true"></shrd-alert>
``` 
and in the component you can pass option to push alert as a golbal:

```js
this.alertService.success(message, title, { forRoot: true }); // by default forRoot is false
```

golbal alert use case is when we want to have one central place for alert in the module base template 

* You can use local and global alert together.
* You can specify `showDuration` time to show alert, and remove it after this time:

```js
this.alertService.success(message, title, { showDuration: 5000 }); // by default showDuration is 0
```
* If you didn't provide `showDuration` option, or you provide `showDuration: 0 `, the alert will not being removedat all.
* `showDuration` is millisecond.


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





### Useful resources
 *  https://github.com/compodoc/compodoc/issues/394
 *  globals cripts/ third-party-lib
    * https://github.com/angular/angular-cli/wiki/stories-global-scripts
    * https://github.com/angular/angular-cli/wiki/stories-third-party-lib
 *  Compodoc
    * https://compodoc.github.io/website/guides/usage.html
 *  ng-block-ui
    * https://github.com/kuuurt13/ng-block-ui
