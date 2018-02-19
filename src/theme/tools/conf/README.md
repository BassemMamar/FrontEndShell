## vendors .. base .. mandatory/optional  js => `vendors.bundle.js`
 This include all mandatory/optional js libraries bundled into one file.

## vendors .. base .. mandatory/optional  style =>  `vendors.bundle.css`
 This include all mandatory/optional css libraries bundled into one file.


## demo5 base js => `scripts.bundle.js`

* {$config.path.src}/js/framework/base/**/*.js:
  * app.js
  * util.js


* {$config.path.src}/js/framework/components/general/datatable/datatable.js:
  * mDatatable plugin setup

* {$config.path.src}/js/framework/components/general/**.js:
main functionality used by mApp, mLayout, mUtil to init theme
  * header.js
  * animate.js
  * dropdown.js
  * offcanvas.js
  * menu.js
  * portlet.js
  * quicksearch.js
  * scroll-top.js
  * toggle.js
  * ...

* {$config.path.src}/js/demo/demo5/base/layout.js:
   mLayout for demo 5 template	

* {$config.path.src}/js/snippets/base/quick-sidebar.js:
   for sidebar which we don't have it for now


## demo5 base style => `style.bundle.css`

* {$config.path.src}/sass/demo/demo5/style.scss:
  * this file contains all style requirement including bootstrapa 4 it self.


Note:
> when doing `Gulp build` the result files will be saved in `assets` file in this way:

```
assets/
 ├──fonts/                                 
 ├──images/             
 |
 ├──scripts.bundle.js                     
 ├──style.bundle.css                 
 ├──vendors.bundle.css                   
 ├──vendors.bundle.css                   
 ├── ...
 ├── ...
 ├── web.config
 └──.gitkeep

```
