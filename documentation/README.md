# [TwicPics Components](https://www.npmjs.com/package/@twicpics/components)

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/main/documentation/cover.png)

## What is [TwicPics](https://www.twicpics.com/)?

[TwicPics](https://www.twicpics.com/) is a __Responsive Image Service Solution__ (SaaS) that enables __on-demand responsive image generation__.

With [TwicPics](https://www.twicpics.com/), developers only deal with high-resolution versions of their media while end-users receive __optimized, perfectly sized, device-adapted__ versions __delivered from a server close to them__.

[TwicPics](https://www.twicpics.com/) acts as an __image proxy__. It requests your master image, be it on your own web server, cloud storage or DAM, then generates a __device-adapted__ version with __best-in-class compression__, delivered directly to the end-user from the __closest delivery point__ available.

## What is [TwicPics Components](https://www.npmjs.com/package/@twicpics/components)?

[TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is a __collection of web components__ that make it dead easy to unleash the power of [TwicPics](https://www.twicpics.com/) in your own projects and using the __framework of your choice__.

[TwicPics Components](https://www.npmjs.com/package/@twicpics/components) currently supports:

- [Angular](https://angular.io/) (version 11 to 13)
- [React](https://reactjs.org/) and [Next.js](https://nextjs.org/)
- [Svelte](https://svelte.dev/) (version 3)
- [Vue.js](https://vuejs.org/) (version 2 to 3) and [Nuxt.js](https://nuxtjs.org/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## Installation

[TwicPics Components](https://www.npmjs.com/package/@twicpics/components) comes in the form of an [NPM](https://www.npmjs.com/) package.

To add the package to your project, type one of:

- `npm add @twicpics/components`
- `yarn add @twicpics/components`

depending on which package manager you fancy.

## Setup and Usage

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

### Angular 11+

__WARNING__: while importing angular components, you will have to select the targeted version
eg : 
```ts
import {xxx} from @twicpics/components/angular11
``` 

#### `app.module.ts`

You need to import the TwicPicsComponentsModule within your app.module.ts file.
```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TwicPicsComponentsModule } from "@twicpics/components/angular<your-targeted-version>";

@NgModule( {
    "declarations": [ AppComponent ],
    "imports": [
        BrowserModule,
        TwicPicsComponentsModule,
    ],
    "providers": [],
    "bootstrap": [ AppComponent ],
} )
export class AppModule { }
```

#### `app.component.ts`

You will need to configure TwicPicComponents
```ts
import { Component } from "@angular/core";
import { installTwicPics } from "@twicpics/components/angular<your-targeted-version>";
@Component( {
    "selector": `app-root`,
    "templateUrl": `./app.component.html`,
} )
export class AppComponent {
}

installTwicPics( {
    // domain is mandatory
    "domain": "https://<your-domain>.twic.pics"
} );
```

#### `<your-component-within-app.module>.component.html`

```html
<TwicImg src="path/to/your/image"></TwicImg>
```

### Next

#### `_app.js`

```js
import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

installTwicPics({
     // domain is mandatory
    "domain": "https://<your-domain>.twic.pics"
});

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
```
__WARNING__: editing the file containing the call to the `installTwicPics` method in watch mode (*ie* `npm|yarn next dev` ) will lead to the __warning__ message `install function called multiple times` on the browser console.  
You will need to __manually reload__ the page in your browser for any changes made to the TwicPics module configuration to take effect on the client side.  
This only concerns the file containing the call to the `installTwicPics` method and is only a penalty when modifying the configuration options.


#### `index.js`

```js
import { TwicImg } from "@twicpics/components/react";
export default function Home() {
    return (
            ...
            <TwicImg src="path/to/your/image"></TwicImg>
            ...
    );
}
```
### Nuxt2.x

#### `nuxt.config.js`

Add `@twicpics/components/nuxt2` to the modules section

With your twicpics configuration

```js
export default {
    ...
    "modules": [
        [
            `@twicpics/components/nuxt2`,
            {
                "domain": `https://<your-domain>.twic.pics`,
            },
        ],
    ],
    ...
};
```

Or a separate section twicpics for component configuration:

```js
export default {
    ...
    "modules": [ `@twicpics/components/nuxt2` ],
    ...
    "twicpics": {
        "domain": `https://<your-domain>.twic.pics`,
    },
};
```

#### `index.vue`

```html
<template>
    ...
    <TwicImg src="path/to/your/image"></TwicImg>
    ...
</template>

<script>
export default {};
</script>
```

### React
#### `main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom";

import Root from "./root.jsx";

import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

installTwicPics( {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById( "root" )
);
```

#### `root.jsx`

```jsx
import React from "react";

import { TwicImg } from "@twicpics/components/react";

const Root = () => (
  <TwicImg src="path/to/your/image"/>
);

export default Root;
```

### Svelte 3.x

#### `main.js`

```js
import Root from "./root.svelte";

import { installTwicPics } from "@twicpics/components/svelte3";
import "@twicpics/components/style.css";

installTwicPics( {
  // domain is mandatory
  "domain": `https://<your-domain>.twic.pics`
} );

export default new Root( {
  "target": document.getElementById( "root" ),
} );
```

#### `root.svelte`

```html
<script context="module">
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<TwicImg src="path/to/your/image"/>
```

### Vue 2.x

#### `main.js`

```js
import Vue from "vue";

import Root from "./root.vue";

import TwicPics from "@twicpics/components/vue2";
import "@twicpics/components/style.css";

Vue.use( TwicPics, {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );

new Vue( {
  "render": h => h( Root ),
} ).$mount( `#root` );
```

#### `root.vue`

```html
<template>
  <TwicImg src="path/to/your/image"/>
</template>
```

__Changing components names__

You can change how components are named using the `TwicImg` and/or `TwicVideo` options when calling `use`:

```js
Vue.use( TwicPics, {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics",
  "TwicImg": "Batman"
} );
```

You can then reference the component using the alternate name:

```html
<template>
  <Batman src="path/to/your/image"/>
</template>
```

### Vue 3.x

#### `main.js`

```js
import { createApp } from "vue";

import Root from "./root.vue";

import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";

const app = createApp( Root );

app.use( TwicPics, {
  // domain is mandatory
  "domain": `https://<your-domain>.twic.pics`
} );

app.mount( `#root` );
```

#### `root.vue`

```html
<template>
  <TwicImg src="path/to/your/image"/>
</template>
```

__Changing components names__

You can change how components are named using the `TwicImg` and/or `TwicVideo` options when calling `use`:

```js
app.use( TwicPics, {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics",
  "TwicImg": "Batman"
} );
```

You can then reference the component using the alternate name:

```html
<template>
  <Batman src="path/to/your/image"/>
</template>
```

### Web Components

__WARNING__: every single Shadow DOM the TwicPics components are descendants of must be opened. That's the only way the TwicPics Script will be able to reach them.

#### `index.js`

```js
import { installTwicPics, TwicImg } from "@twicpics/components/webcomponents";

installTwicPics( {
  // domain is mandatory
  "domain": `https://<your-domain>.twic.pics`
} );

customElements.define( `twic-img`, TwicImg );
```

#### `index.html`

```html
<body>
  <twic-img src="path/to/your/image"/>
</body>
```

## Setup Options

| Option | Description | Type | Default |
|:-|:-|:-|:-|
| `anticipation` | [TwicPics](https://www.twicpics.com/) will lazy-load images by default. To avoid too abrupt a transition with elements appearing into view and then images very obviously loading afterwards, [TwicPics](https://www.twicpics.com/) will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting. | `Number` | `0.2` |
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/documentation/subdomain/). Providing it is __mandatory__. | `String` | |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `step` | To avoid requesting too may variants of the same image, [TwicPics](https://www.twicpics.com/) will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

## Components

The exact same components are available in all supported frameworks.

### `TwicImg`

This component can be used in place of an `img` element.

```html
<TwicImg
  src="<path>" (mandatory)
  alt="<string>"
  ratio="<ratio>"
  mode="<contain|cover>"
  focus="<auto|coordinates>"
  position="<css position>"
  placeholder="<none|preview|meancolor|maincolor>"
  transition="<boolean>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
  step="<integer>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | based on `src` |
| `focus` | Only useful in `cover` mode. Can be `auto` or coordinates. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-focus) for more information. | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. | `String` | `preview` |
| `position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `String` | `center` |
| `ratio` | Unitless `width/height` value pair (as in `4/3`). If `height` is not specified, it is assumed to be `1`. A square area will be created by default. | `String` | `1` | |
| `src` | Path to the image. Providing it is __mandatory__. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Whether or not to reveal images with a fade in effect once they have been loaded. | `Boolean` | `true` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

### `TwicVideo`

This component can be used in place of a `video` element.

```html
<TwicVideo
  src="<path>" (mandatory)
  ratio="<ratio>"
  mode="<contain|cover>"
  focus="<auto|coordinates>"
  position="<css position>"
  placeholder="<none|preview|meancolor|maincolor>"
  transition="<boolean>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
  step="<integer>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `focus` | Only useful in `cover` mode. Can be `auto` or coordinates. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-focus) for more information. | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. | `String` | `preview` |
| `position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `String` | `center` |
| `ratio` | Unitless `width/height` value pair (as in `4/3`). If `height` is not specified, it is assumed to be `1`. A square area will be created by default. | `String` | `1` | |
| `src` | Path to the video. Providing it is __mandatory__. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Whether or not to reveal images with a fade in effect once they have been loaded. | `Boolean` | `true` |
| `transitionDelay` | [Transition delay of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) | `String` | `0ms` |
| `transitionDuration` | [Duration of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) | `String` | `400ms` |
| `transitionTimingFunction` | [CSS timing function applied to the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) | `String` | `ease` |

## Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

### Example

`styles.css`

```CSS
.style-driven {
  --twic-ratio: calc( 16/9 );
  --twic-mode: contain;
  --twic-position: right;
    width: 500px; // regular CSS can also be used
}

.super-wide {
  --twic-ratio: calc( 36/9 );
}

#custom-animation {
  --twic-ratio: calc( 21/9 );
  --twic-mode: cover;
  --twic-transition-delay: 5ms;
  --twic-transition-duration: 1000ms;
  --twic-transition-timing-function: ease-out;
}
```

`template.html`

```html
<TwicImg 
  id="custom-animation"
  src="path/to/your/image"
></TwicImg>

<TwicImg
  class="style-driven"
  src="path/to/your-second/image"
></TwicImg>

<TwicImg 
    class="super-wide"
    src="path/to/your-fourth/image"
></TwicImg>

<!---
    Attributes take precedence over CSS.
    In the next example, ratio will be 1 and NOT calc(16/9)
--->
<TwicImg 
  class="style-driven"
  src="path/to/your-third/image" 
  ratio="1"
></TwicImg>
```

### Responsive Example

Setting up components using CSS enables hassle-free responsive designs.

`styles.css`

```css
.style-driven {
  --twic-ratio: 1.9;
}

@media ( min-width: 640px ) {
  .style-driven {
    --twic-mode: contain;
  }
}

@media ( min-width: 768px ) {
  .style-driven {
    --twic-mode: cover;
    --twic-ratio: calc( 4/3 );
  }
}

@media (min-width: 1024px) {
  .style-driven {
    --twic-ratio: calc( 16/9 );
  }
}

@media ( min-width: 1280px ) {
  .style-driven {
    --twic-ratio: calc( 21/9 );
  }
}

@media ( min-width: 1536px ) {
  .style-driven {
    --twic-ratio: calc( 36/9 );
  }
}
```

`template.html`

Your HTML features a single component that will follow your CSS directives and behave responsively.
 
```html
<TwicImg
  class="style-driven"
  src="path/to/your/image"
></TwicImg>
```

### CSS Variables

```css
<selector> {
  --twic-ratio: <ratio>;
  --twic-mode: <contain|cover>;
  --twic-position: <css position>;
  --twic-transition-delay: <string>;
  --twic-transition-duration: <string>;
  --twic-transition-timing-function:<string>;
}
```

Each CSS variable corresponds to one of the components attributes listed in the [Components section](#components). If present, the attribute takes precedence over the corresponding CSS variable.

| Variable | Description | HTML Attribute | Default |
|:-|:-|:-|:-|
| `--twic-mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `mode` | `cover` |
| `--twic-position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `position` | `center` |
| `--twic-ratio` | Floating point value corresponding to a unitless `width/height` ratio (as in `calc(4/3)` or `1.333`). Ratio will correspond to a square area by default. | `ratio` | `1` |
| `--twic-transition-delay` | [Transition delay of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) | `transitionDelay` | `0ms` |
| `--twic-transition-duration` | [Duration of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) | `transitionDuration` | `400ms` |
| `--twic-transition-timing-function` | [CSS timing function applied to the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) | `transitionTimingFunction` | `ease` |

## Example

You can find usage examples for all supported frameworks [here](https://github.com/twicpics/components/tree/main/samples).

[license-image]: https://img.shields.io/npm/l/@twicpics/components.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/twicpics/components/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/@twicpics/components.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components
