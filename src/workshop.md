Angular Quick Start:

	Step 1. Set up the Development Environment
		
		`npm install -g @angular/cli`
	
	 Step 2. Create a new project
		
		`ng new my-app --routings -d`

	 Step 3: Serve the application

		`ng serve --open`

	 Step 4: Edit your first Angular component

        ```js
		export class AppComponent {
  			title = 'My First Angular App';
		}
        ```

	 Step 5: Explore files structure

        The src folder:

            ```js
            src
                app
                    app.component.css
                    app.component.html
                    app.component.spec.ts
                    app.component.ts
                    app.module.ts
                assets
                    .gitkeep
                environments
                    environment.prod.ts
                    environment.ts
                favicon.ico
                index.html
                main.ts
                polyfills.ts
                styles.css
                test.ts
                tsconfig.app.json
                tsconfig.spec.json
            ```


        The root folder:

            ```js
            my-app
                e2e
                    app.e2e-spec.ts
                    app.po.ts
                    tsconfig.e2e.json
                node_modules/...
                src/...
                .angular-cli.json
                .editorconfig
                .gitignore
                karma.conf.js
                package.json
                protractor.conf.js
                README.md
                tsconfig.json
                tslint.json                        
            ```


	 Step 6: Angular Architecture Overview:

        * Modules      

            ```js

            @NgModule({
                declarations: [
                    AppComponent,
                    ...
                ],
                imports: [
                    BrowserModule,
                    FormsModule,
                    HttpModule
                ],
                providers: [],
                bootstrap: [AppComponent]
            })
            ```

        * Components 


            The decorator and class (.ts file):

                ```js
                @Component({
                    selector:    'app-hero-list',
                    templateUrl: './hero-list.component.html'
                    })
                    export class HeroListComponent implements OnInit {
                    /* . . . */
                }
                ```

                ```js
                export class HeroListComponent implements OnInit {
                    heroes: Hero[];

                    constructor(private service: HeroService) { }

                    ngOnInit() {
                        this.heroes = this.service.getHeroes();
                    }

                }
                ```


            The Template (.html file):  

                ```html
                <h2>Hero List</h2>

                <p><i>Pick a hero from the list</i></p>
                <ul>
                    <li *ngFor="let hero of heroes" (click)="selectHero(hero)">
                        {{hero.name}}
                    </li>
                </ul>

                ```

        * Services

            The class (.ts file):  


            ```js
            @Injectable()
            export class HeroService {
                private heroes: Hero[] = [];

                constructor() { }

                getHeroes() {

                    this.heroes =[...];

                    return this.heroes;
                }
            }
            ```


	 Step 7: Create home/about components:

        * ng generate component home -d     

        * show home in app.html `<app-home></app-home>`


	 Step 8: Routing & Navigation (home/about):

        The routing declarations:

            ```js
                const appRoutes: Routes = [
                        { path: 'home', component: HomeComponent },
                        { path: 'about',      component: AboutComponent },

                        { path: '',
                            redirectTo: '/home',
                            pathMatch: 'full'
                        },
                        { path: '**', component: PageNotFoundComponent }
                    ];

                    @NgModule({
                        imports: [
                            RouterModule.forRoot(appRoutes)
                            // other imports here
                        ],
                        ...
                    })
                export class AppModule { }
            ```

        The routing directive:

            `<router-outlet></router-outlet>`

	 
     Step 9: Deployment:   

          ```js
            # these are equivalent
            ng build --target=production --environment=prod
            ng build --prod --env=prod
            ng build --prod

            # and so are these
            ng build --target=development --environment=dev
            ng build --dev --e=dev
            ng build --dev
            ng build
          ```

     Step 10: Explore Frontend Shell v2:            