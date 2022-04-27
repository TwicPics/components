







![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.6.4/documentation/resources/webcomponents-cover.png)



- [Overview](#about)
    - [What is TwicPics ?](#what-is-twicpics)
    - [What is TwicPics Components ?](#what-is-twicpics-components)
- [Installation](#installation)
    - [Requirement](#Requirement)
    - [Installing `@twicpics/components` into your project](#adding-twicpics-components-to-your-project)
- [Setup](#setup)
    - [Setting-up TwicPics Components into your project](#setting-up-your-project)
    - [Setup Options](#setup-options)
- [Usage](#usage)
    - [Basic usage](#basic-usage)
    - [Style Driven Approach](#style-driven-approach)
    - [Responsive Example](#responsive-example)
- [Components properties](#components-props)
    - [TwicImg](#twic-img)
    - [TwicVideo](#twic-video)
- [CSS variables](#css-variables)
- [Examples](#examples)
- [Questions and feedback](#getting-help)
- [Other frameworks](#other-frameworks)
- [Licence](#licence)
    
## Overview

<div id='what-is-twicpics'/>

### What is [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components)? 

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) is a __Responsive Image Service Solution__ (SaaS) that enables __on-demand responsive image generation__.

With [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components), developers only deal with high-resolution versions of their media while end-users receive __optimized, perfectly sized, device-adapted__ versions __delivered from a server close to them__.

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) acts as an __image proxy__. It requests your master image, be it on your own web server, cloud storage or DAM, then generates a __device-adapted__ version with __best-in-class compression__, delivered directly to the end-user from the __closest delivery point__ available.

<div id='what-is-twicpics-components'/>

### What is [TwicPics Components](https://www.npmjs.com/package/@twicpics/components)?

[TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is a __collection of web components__ that make it dead easy to unleash the power of [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) in your own projects.

Basically, TwicPics components replace `img` and `video` tags. They greatly and transparently optimize your CLS by providing LQIP (Low-Quality Image Placeholders) and Lazy Loading out of the box.

```html
  // a classical img usage
  <img src="https://assets.twicpics.com/examples/football.jpg" />
```

```html
  // a TwicPics img component usage
  <twic-img src="https://assets.twicpics.com/examples/football.jpg" />
```

__WARNING__: every single Shadow DOM the TwicPics components are descendants of must be opened. That's the only way the TwicPics Script will be able to reach them.

<a href="https://codesandbox.io/s/web-component-basic-19j1fm?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit web-component - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

Thanks to the open source [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) Components, delivering responsive images in your [Web Components](https://www.webcomponents.org/introduction) projects has never been easier.

<div id='installation'/>

## Installation

<div id='create-an-account'/>

### Requirement

The only requirement is to have a TwicPics account. 
If you don't already have one, you can easily [create your own TwicPics account for free](https://account.twicpics.com/signup).

<div id='adding-twicpics-components-to-your-project'/>

### Installing `@twicpics/components` into your project
You just need to add the [@twicpics/components](https://www.npmjs.com/) npm package to your project.

Simply type one of:

```bash
npm add @twicpics/components
```

or 

```bash
yarn add @twicpics/components
```

depending on which package manager you fancy.

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```jsx
// import TwicPics webcomponents
import { installTwicPics } from "@twicpics/components/webcomponents";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and the configuration part (see [Setup Options](#setup-options))

```js
installTwicPics( {
  // domain is mandatory
  "domain": `https://<your-domain>.twic.pics`
} );
```

into the main js file of your project.

```js
// Here is an example of a main file configured with TwicPics.
import { installTwicPics, TwicImg } from "@twicpics/components/webcomponents";

installTwicPics( {
  // domain is mandatory
  "domain": `https://<your-domain>.twic.pics`
} );

customElements.define( `twic-img`, TwicImg );
```

```html
// Other example with configuration embeded in an html file
// and a full client side consideration
<script type="module">
  import {
    installTwicPics,
    TwicImg
  } from "./node_modules/@twicpics/components/webcomponents/module.mjs";

  installTwicPics({
    "domain": `https://<your-domain>.twic.pics`
  });

  // define the custom element alias
  customElements.define(`twic-img`, TwicImg);
</script>
```

<div id='setup-options'/>

### Setup Options

| Option | Description | Type | Default |
|:-|:-|:-|:-|
| `anticipation` | [TwicPics](https://www.twicpics.com/) will lazy-load images by default. To avoid too abrupt a transition with elements appearing into view and then images very obviously loading afterwards, [TwicPics](https://www.twicpics.com/) will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting. | `Number` | `0.2` |
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/documentation/subdomain/). Providing it is __mandatory__. | `String` | |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
| `step` | To avoid requesting too may variants of the same image, [TwicPics](https://www.twicpics.com/) will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

<div id='usage'/>

## Usage

TwicPics Web Components comes as `Custom Html Elements`. Just use them in place of `img` or `video` tags according to the custom alias you have specified.

```html
<twic-img src="path/to/your/image"/>
```

More properties [here](#components).

<div id='basic-usage'/>

### Basic usage

`<your-page>.html`

```html
<body>
    <twic-img src="path/to/your/image"/>
</body>
```

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`index.html`

```html
<style>
  body {
    background-color: #342d4e;
    color: #fff;
  }

  main {
    margin-left: auto;
    margin-right: auto;
    max-width: 75%;
  }

  .twic-item {
    margin-bottom: 1rem;
  }

  .landscape {
    --twic-ratio: calc(4 / 3);
  }
  .portrait {
    --twic-ratio: calc(3 / 4);
  }
  .square {
    --twic-ratio: calc(1);
  }

  .lg {
    width: 300px;
  }

  .md {
    width: 150px;
  }

  .sm {
    width: 100px;
  }
</style>

<body>
  <main>
    <div class="twic-item landscape">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <div class="twic-item square">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <div class="twic-item portrait">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <div class="twic-item contain left">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <div class="twic-item contain right">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <div class="twic-item lg">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <div class="twic-item md">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <div class="twic-item sm">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
    <!---
      Attributes take precedence over CSS.
      In the next example, ratio will 16/9 AND NOT 1 as defined in square css class 
  --->
    <div className="cover square">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
  </main>
</body>
```

<a href="https://codesandbox.io/s/web-component-style-driven-o0xfmd?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit web-component - Style Driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

`<your-page>.html`

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
<style>
  main {
    margin-left: auto;
    margin-right: auto;
    max-width: 75%;
  }

  .style-driven-responsive {
    --twic-ratio: calc(2 / 3);
    --twic-mode: cover;
    margin: auto;
  }

  @media (min-width: 640px) {
    .style-driven-responsive {
      --twic-ratio: calc(1);
    }
  }

  @media (min-width: 768px) {
    .style-driven-responsive {
      --twic-ratio: calc(4 / 3);
    }
  }

  @media (min-width: 1024px) {
    .style-driven-responsive {
      --twic-ratio: calc(16 / 9);
    }
  }

  @media (min-width: 1280px) {
    .style-driven-responsive {
      --twic-ratio: calc(1.85);
    }
  }

  @media (min-width: 1536px) {
    .style-driven-responsive {
      --twic-ratio: calc(21 / 9);
    }
  }
</style>

<body>
  <main>
    <div class="style-driven-responsive">
      <twic-img src="path/to/your/image"></twic-img>
    </div>
  </main>
</body>

```

<a href="https://codesandbox.io/s/web-component-art-direction-xdyumx?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit web-component - Art Direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<div id='components-props'/>

## Components Properties

<div id='twic-img'/>

### `twic-img`

This component can be used in place of an `img` element.

```html
<twic-img
  src="<path>" (mandatory)
  alt="<string>"
  ratio="<ratio>"
  mode="<contain|cover>"
  focus="<auto|coordinates>"
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  transition="<fade|zoom|none>"
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
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `String` | `center` |
| `ratio` | Unitless `width/height` value pair (as in `4/3`). If `height` is not specified, it is assumed to be `1`. A square area will be created by default. | `String` | `1` | |
| `src` | Path to the image. Providing it is __mandatory__. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Determines how image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`), both (`fade+zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

<div id='twic-video'/>

### `twic-video`

This component can be used in place of a `video` element.

```html
<twic-video
  src="<path>" (mandatory)
  ratio="<ratio>"
  mode="<contain|cover>"
  focus="<auto|coordinates>"
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  transition="<fade|zoom|none>"
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
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `String` | `center` |
| `ratio` | Unitless `width/height` value pair (as in `4/3`). If `height` is not specified, it is assumed to be `1`. A square area will be created by default. | `String` | `1` | |
| `src` | Path to the video. Providing it is __mandatory__. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Determines how video will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`), both (`fade+zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDelay` | [Transition delay of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) | `String` | `0ms` |
| `transitionDuration` | [Duration of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) | `String` | `400ms` |
| `transitionTimingFunction` | [CSS timing function applied to the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) | `String` | `ease` |

<div id='css-variables'/>

## CSS Variables

List of variables that can be used to configure your components using pure CSS.

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

Each CSS variable corresponds to one of the components attributes listed in the [Components Properties section](#components). If present, the attribute takes precedence over the corresponding CSS variable.

| Variable | Description | HTML Attribute | Default |
|:-|:-|:-|:-|
| `--twic-mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `mode` | `cover` |
| `--twic-position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `position` | `center` |
| `--twic-ratio` | Floating point value corresponding to a unitless `width/height` ratio (as in `calc(4/3)` or `1.333`). Ratio will correspond to a square area by default. | `ratio` | `1` |
| `--twic-transition-delay` | [Transition delay of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) | `transitionDelay` | `0ms` |
| `--twic-transition-duration` | [Duration of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) | `transitionDuration` | `400ms` |
| `--twic-transition-timing-function` | [CSS timing function applied to the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) | `transitionTimingFunction` | `ease` |

<div id='example'/>

## Examples

You can find usage examples [in our sample project](https://github.com/twicpics/components/tree/main/samples/react).

<div id='getting-help'/>

## Questions and feedback

Fell free to submit an [issue](https://github.com/TwicPics/components/issues) or to ask us anything by dropping an email at [support@twic.pics](mailto:support@twic.pics).


<div id='other-frameworks'/>

## Other frameworks

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) provides the most versatile solution on the market for delivering responsive media.

TwicPics Components are available [in the most popular javascript frameworks](https://www.npmjs.com/package/@twicpics/components).


<div id='licence'/>

## Licence

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

[license-image]: https://img.shields.io/npm/l/@twicpics/components.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/twicpics/components/master/LICENSE
[npm-image]: https://img.shields.io/badge/npm-v0.6.4-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.6.4