<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# TwicPics Components CHANGELOG

## 0.5.3

- __chore__: optimizing the size of `Angular` libraries 

## 0.5.2

- __bug__: fixes `ratio issue` on `Svelte` 

## 0.5.1

- __bug__: fixes placeholder=`none`
- __feature__: display of a warning message in the browser console when components are used without initialization phase : `domain has not been configured`.

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
