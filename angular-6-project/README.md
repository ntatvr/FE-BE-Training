# AngularProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Install and Build
Step 1: You have to install angular CLI (Command Line Intergace) first, use the command below:
npm install -g @angular/cli

Step 2: Create new project with this command:
ng new project-name

Step 3: Install libs
npm install

Step 4: Navigation to project folder and run this command:
ng serve --open

Note: Server address: http://localhost:4200/, Port 4200 is default and you can change the default port at .angular-cli.json file


## Structure
angular-project

├── src // source folder
│   ├── app // Foler contain compoent, service, module and route files
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── environments // Folder contain environment configuration files
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html // Main page
│   ├── main.ts
│   ├── favicon.ico
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── e2e  // end-to-end tests
├── angular-cli.json // Angular CLI configuration
├── karma.conf.js // Unit test
├── package.json
├── protractor.conf.js // Project configuration
├── README.md
└── tslint.json


## Create Component
You can create a new component with this command:
-> ng generate component component-name

Syntax used to create ngModel as below:
-> [(ng-model)]=”model-name”


## Create Routing
Run this command:
-> ng generate module app-routing --flat --module=app

##
- ActivitiedRoute:
- BehaviorSubject: rxjs/BehaviorSubject: share data between 2 components