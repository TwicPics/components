<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# TwicPics Components CHANGELOG

# 0.6.7
- __chores__: improves configuration of `transition` property
- __feature__: supports `Nuxt.js 3.x`

## 0.6.6
- __bug__: fixes a refresh issue in `angular`
- __feature__: improves style isolation of components

## 0.6.5
- __doc__: adds link to the demo site in the `Nuxt 2.x` documentation
- __feature__: adds `path` to the initialization parameter list

## 0.6.4
- __bug__: fixes `esm` version importation 
- __doc__: adds link to the demo site in the `VueJS 2.x` documentation

## 0.6.3
- __chore__: removes unused methods and factory
- __chore__: uses the package version number in documentation
- __doc__: adds link to the demo site in the `Angular` documentation
- __feature__: `Angular` components export the `Mode` and `Placeholder` types which allows dynamic setting of the related properties
- __feature__: adds a `zoom` effect to the `transition` options

## 0.6.2

- __chore__: upgrades dependencies version
- __doc__: creates technology-specific documentation
- __feature__: supports `Gatsby`

## 0.6.1

- __bug__: `className` prop passed to `React` and `Svelte` components is now applied to the outer div
- __bug__: fixes `transition` still active even if it was set to `false`
- __bug__: fixes type validation of `transition` `props` in `React`, `VueJS 2.x` and `VueJS 3.x`
- __chore__: removes irrelevant attribute `className` in angular
- __feature__: simplifies integration in `Nuxt.js 2.x`

## 0.6.0

- __bug__: no longer generates empty `CSS` property values in `SSR`
- __bug__: fixes aspect ratio sometimes not being respected in `CSS` grids
- __bug__: no longers generates an `background-image: undefined` when placeholder is `none` in `Svelte`
- __chore__: seriously reduces the size of all `Angular` distributions
- __feature__: supports `Angular 11`

## 0.5.2

- __bug__: no longer generates camel-cased `CSS` property names in `Svelte`

## 0.5.1

- __bug__: `placeholder="none"` no longer corrupts background URLs that generated `404` responses
- __feature__: displays a warning message in the browser console when components are used without initialization

## 0.5.0

- __breaking__: removes `width` and `height` attributes
- __bug__: fixes `install function already called` error on server side when modifying the class calling the installTwicPics method in `Next.js`
- __bug__: fixes custom class setting using `installTwicPics`
- __feature__: it is now possible to setup components using pure `CSS`
- __feature__: supports `Angular 12+`
- __feature__: allows passing `className` prop to `React` and `Svelte` components

## 0.4.1

- __bug__: removes `<noscript>` tags generation in SSR mode. Hydration is too heavy handed in most frameworks.

## 0.4.0

- __breaking__: de-duplicates `style.css`
- __bug__: fixes `<noscript>` generation in `Nuxt.js`
- __bug__: silences hydration warnings due to `<noscript>` in `Next.js`
- __doc__: makes crystal clear that transition-related properties can be overriden
- __feature__: supports native `Web Components`
- __feature__: components names can be changed in `VueJS`
- __feature__: reduces footprint of `TypeScript` definitions

## 0.3.1

- __bug__: fixes module resolution for `Next.js`

## 0.3.0

- __doc__: provides usage examples for all frameworks
- __feature__: provides `TypeScript` definitions for all frameworks
- __feature__: generates `<noscript>` tags in SSR mode

## 0.2.1

- __bug__: fixes default placeholder value for `Svelte 3.x`

## 0.2.0

- __feature__: supports `Svelte 3.x`
- __feature__: reduces footprint of all components

## 0.1.0

- __feature__: supports `Next.js`, `Nuxt.js`, `React`, `VueJS 2.x` and `VueJS 3.x`
