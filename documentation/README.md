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
| `ratio` | Unitless `width/height` value pair. A squared area will be created by default. | `String` | `1/1` | |
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
| `ratio` | Unitless `width/height` value pair. A squared area will be created by default. | `String` | `1/1` | |
| `src` | Path to the video. Providing it is __mandatory__. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Whether or not to reveal images with a fade in effect once they have been loaded. | `Boolean` | `true` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

## Example

You can find usage examples for all supported frameworks [here](https://github.com/twicpics/components/tree/main/samples).

[license-image]: https://img.shields.io/npm/l/@twicpics/components.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/twicpics/components/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/@twicpics/components.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components
