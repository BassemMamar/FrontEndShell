# Src

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Key Modules

### CoreModule
The `CoreModule` drives the Angular application. It handles the API HTTP Interceptor, Authentication Guard and Authentication Service. In addition, the `CoreModule` holds the Login component, not-found component and the global Header component.

#### HeaderComponent

The `HeaderComponent` independently determines the route from the URL, and the permissions set in the User Authentication token, and then appropriately displays the links in the navigation bar.

### SharedModule

The `SharedModule` contains directives and components which may be used across multiple modules and areas of the application. A good example is the `RequiredLabelDirective` which adds an asterisk to an input label. This directive can be used all over the application including the `FormComponent` and `LoginComponent` which are in the `FormModule` and `CoreModule` respectively.

### BamModule

The `AdminModule` represents a privately accessible module which is lazy-loaded only upon successful user authentication via the `LoginComponent` and `AuthenticationService` in the `CoreModule`. In a real-world application the `AdminModule` would be the registered-user dasboard. In this demo, you can use any username and password to login.



