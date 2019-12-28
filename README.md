# Bluestack Campaigns

This project was build with Angular. IndexedDB is used for holding Campaigns data.

## Live Demo

A live demo can be find [Here](https://amitsaini4142.github.io).

## Dependencies
1. NodeJS
2. Angular CLI

## Tech Stack Used
1. Angular
2. SCSS
3. IndexedDB

## Angular Style Guide
This implementation follows guidelines mentioned by [Angular Style Guide](https://angular.io/guide/styleguide).This assignment also incorporates `lazyloading` of modules.Campaign module is lazily loaded in this assignment. Project is devided into three modules
1. `Core Module` contains common layout components and services.
2. `Shared Module` contains `shared.module.ts` which exports modules that can be used by any number of modules. Only shared module needs to be imported in these modules.
3. `Campaign Module` This is a feature module. It has seprate components for each entities.

## SASS Support

Sass CSS preprocessor is used for nesting of css properties.Beside this it is used in this project for following two things as well
1. Variables
    1. Heading Color
    2. Sub heading color
2. Mixins
    1. font-size(for rem fallback)
    2. css properties that require vendor prefixes in our case(transition, transform)
    3. media query utils
3. `@at-root` rule is used to break out of nesting thus also maintaining grouping of parent child css.

## Resposiveness
UI is fully responsive for all devices possible.

## Internationalization
Following two languages are being used here.
1. English
2. Italian

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

Reach Out to my personal email address amitsaini4142@gmail.com
