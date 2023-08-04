
![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.22.0/documentation/resources/svelte-cover.png)



- [Overview](#overview)
    - [What is TwicPics ?](#what-is-twicpics)
    - [What is TwicPics Components ?](#what-is-twicpics-components)
- [Installation](#installation)
- [Setup](#setup)
    - [Setting-up TwicPics Components into your project](#setting-up-your-project)
    - [Setup Options](#setup-options)
- [Usage](#usage)
    - [Basic usage](#basic-usage)
    - [Bulk loading with TwicView](#bulk-loading-with-twicview)
    - [Image magnifier](#image-magnifier)
    - [Lifecycle](#lifecycle)
    - [Refit Example](#refit-example)
    - [Responsive Example](#responsive-example)
    - [Style Driven Approach](#style-driven-approach)
    - [Working with ratio="none"](#ratio-none)
- [Components properties](#components-props)
    - [TwicImg](#twic-img)
    - [TwicVideo](#twic-video)
- [CSS variables](#css-variables)
- [Examples](#examples)
- [Questions and feedback](#getting-help)
- [Other frameworks](#other-frameworks)
- [Licence](#licence)
    
## Overview

### What is TwicPics? 

> We've recently launched TwicPics for videos. [Read the announcement](https://www.twicpics.com/blog/announcing-twicpics-for-videos/?utm_source=github&utm_medium=organic&utm_campaign=components). 🚀

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) is a **Responsive Media Service Solution** (SaaS) that enables **on-demand responsive image & video generation**.

With TwicPics, developers only deal with high-resolution versions of their media while end-users receive **optimized, perfectly sized, device-adapted** versions **delivered from a server close to them**.

TwicPics acts as an **proxy**. It retrieves your master file — from your own web server, cloud storage, or DAM — and generates a **device-adapted** version with **best-in-class compression**, delivered directly to the end-user from the **closest delivery point** available.

<div id='what-is-twicpics-components'/>

### What is TwicPics Components?

TwicPics Components is a __collection of web components__ that make it dead easy to unleash the power of [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) in your own projects.

TwicPics Components are a drop-in replacement for `<img>` and `<video>` tags with optimized _Cumulative Layout Shift_ (CLS), low-quality image placeholders, and lazy loading out of the box.

```html
<!-- Before -->
<img src="https://assets.twicpics.com/examples/football.jpg" />

<!-- After -->
<TwicImg src="https://assets.twicpics.com/examples/football.jpg" />
```


Discover our demonstrations and integration examples [in our online demo project](https://twicpics-svelte-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

TwicPics Components are available for `Svelte4`.

If you are using `Svelte3`, you can find their documentation [here](https://github.com/TwicPics/components/blob/0.22.0/documentation/svelte3.md).

## Installation

Add the `@twicpics/components` package to your project as a dev dependency:

```bash
# Using yarn
yarn add @twicpics/components -D

# Or using npm
npm install @twicpics/components --D
```


<div id='setup'/>

## Setup

**Note:** You will need a TwicPics domain to initialize the package. [Create an account for free](https://account.twicpics.com/signup) to get your domain.

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Svelte4` project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```js
// import TwicPics Svelte4 components
import { installTwicpics } from "@twicpics/components/svelte4";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and the configuration part (see [Setup Options](#setup-options))

```js
installTwicpics( {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );
```

into the app startup of your `Svelte4` project.

#### main.js

```js
// Here is an example of a `Svelte4` app startup configured with TwicPics.
import { installTwicpics } from "@twicpics/components/svelte4";
import "@twicpics/components/style.css";

import App from "./App.svelte";

installTwicpics({
  "domain": `https://<your-domain>.twic.pics`
});

const app = new App({
  target: document.body
});

export default app;
```

<div id='setup-options'/>

### Setup Options

| Option | Description | Type | Default |
|:-|:-|:-|:-|
| `anticipation` | [TwicPics](https://www.twicpics.com/) will lazy-load images by default. To avoid too abrupt a transition with elements appearing into view and then images very obviously loading afterwards, [TwicPics](https://www.twicpics.com/) will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting. | `Number` | `0.2` |
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/docs/getting-started/fundamentals#domains-and-paths). Providing it is __mandatory__. | `String` | |
| `env` | Can be `debug`, `offline` or `production`. When set to `debug`, a gray lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of all medias targeted by their `src` value. When set to `offline`, these medias are replaced by a simple placeholder that allows to visualise their display area. | `String` | `"production"` |
| `handleShadowDom` | Must be set to `true` when using TwicComponents within a shadow DOM. | `boolean` | `false` |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | Path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
| `step` | To avoid requesting too may variants of the same image, [TwicPics](https://www.twicpics.com/) will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

<div id='usage'/>

## Usage

Import TwicPics Components `TwicImg` and `TwicVideo` in your template files and use them in place of `img` or `video` tags.

Add the import part in the `script` section of your `.svelte` page
```html
<script>
  // this component will be used in place of an img element.
  import { TwicImg } from "@twicpics/components/svelte4";

  // this component will be used in place of an video element.
  import { TwicVideo } from "@twicpics/components/svelte4";
</script>
```

then, use `<TwicImg>` or `<TwicVideo>` in place of standard tags `<img>` or `<video>` (see [Components Properties](#components)).

<div id='basic-usage'/>

### Basic usage

```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte4";
</script>

<main>
  <TwicImg src="path/to/your/image"></TwicImg>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src%2Flib%2FTwicBasicGrid.svelte&initialpath=basic-grid)

<div id='bulk-loading-with-twicview'/>

### Bulk loading with TwicView

By default, `<TwicImg>` and `<TwicVideo>` will only start loading when they come into the viewport. But sometimes, you may want to load multiple assets in bulk instead of lazy loading them. This is where `<TwicView>` comes into play.

The `<TwicView>` components eager loads all of his `<TwicImg>` and `<TwicVideo>` children as soon as it comes into the viewport (depending on your [anticipation settings](#setup-options).)

For example, if you're building a carousel, you might want to bulk load all images. In the following code, all three images will be loaded when `TwicView` comes into the viewport:

```html
<TwicView>
  <TwicImg src="image1.jpg" />
  <TwicImg src="image2.jpg" />
  <TwicImg src="image3.jpg" />
</TwicView>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src%2Flib%2FTwicBulkLoading.svelte&initialpath=bulk-loading)


### Image magnifier

The `<TwicImg>` component allows to display a __lazy loaded__ zoomed version of your image on __mouse over__.

To activate the zoom feature, simply set the `zoom` property to a number strictly greater than 1. This number represents the magnification factor of your image.

For example: 

```html
  <TwicImg src="image1.jpg" zoom="2" />
  <TwicImg src="image2.jpg" zoom="2.5" />
```

The zoom factor can also be configured through the `--twic-zoom` [CSS variable](#css-variables).

To activate the [style-driven zoom](#style-driven-approach), simply set `zoom` property to `'css'` and add a new rule to your stylesheet. 

For example: 

```html
  <TwicImg src="image3.jpg" zoom="css" class=".zoom-3"/>
```

```css
.zoom-3 {
  --twic-zoom:3;
}
```

It applies only to `TwicImg` component in __cover__ `mode`.


[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src%2Flib%2FTwicZoom.svelte&initialpath=zoom)

<div id='lifecycle'/>

### Lifecycle

Binding to `state` props gives access to the loading state of your image or video.

Here are the values the Component will emit :

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


```html
<!-- component.svelte -->
<script>
  import { TwicImg } from "@twicpics/components/svelte4";
  let state;

  $: {
    // Implement the logic here
    console.log( `TwicComponent emits a new state`, state );
  }
</script>


<TwicImg
  bind:state
  src="path/to/your/image"
/>
```

Another approach is to listen to `statechange` event.

```html
<!-- component.svelte -->
<script>
  import { TwicImg } from "@twicpics/components/svelte4";
  let state;

  const handleStateChange = ( e ) => {
    // Implement the logic here
    state = e.detail;
    console.log( `TwicComponent emits a new state`, state );
  }
</script>


<TwicImg
  on:statechange={handleStateChange}
  src="path/to/your/image"
/>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src%2Flib%2FTwicState.svelte&initialpath=state)


### Refit example

The `<TwicImg>` component allows to __reframe__ your image on the __main subject(s)__ it contains.

In **cover** `mode`, the resulting image will respect`ratio` while maximizing the area occupied by the main subject(s).

In **contain** `mode`, the image will be cropped as close as possible to the main subject(s).

To activate automatic cropping, simply add the `refit` property to your component.

By default, the subject will be placed at the center of the resulting image but it is possible to align the subject with a given border by specifying an `anchor`.

Also by default, the subject will touch the borders of the resulting image. This can be avoided by setting `refit` with a comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) value defining padding.

For example:

```html
  <!-- default refit: centered object(s), no padding around -->
  <TwicImg src="image1.jpg" refit />

  <!-- main subject(s) will be left aligned -->
  <TwicImg src="image3.jpg" anchor="left" refit/>

  <!-- a 5% padding will be applied around main subject(s) -->
  <TwicImg src="image2.jpg" refit="5p" />

  <!-- a 5% padding will be applied vertically, a 10% padding will be applied horizontally -->
  <TwicImg src="image3.jpg" refit="5p,10p" />
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src%2Flib%2FTwicRefit.svelte&initialpath=refit)

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte4";
</script>

<style>
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

<main>
  <div class="landscape">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="square">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="portrait">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="lg">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="md">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="sm">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src/lib/TwicStyleDriven.svelte&initialpath=style-driven)


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.


```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte4";
</script>

<style>
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

<main>
  <div class="style-driven-responsive">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

Your template features a single component that will follow your CSS directives and behave responsively.
 
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src%2Flib%2FTwicArtDirections.svelte&initialpath=art-directions)

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and optimizing your _Cumulative Layout Shift_ (CLS) metric.


```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte4";
</script>

<style>
  /* You are responsible for properly sizing the component. */
  .hero-image {
    height:500px;
  }

  @media (min-width: 1024px) {
    .hero-image {
      height:300px;
      width:100%;
    }
  }
</style>

<TwicImg
  src="path/to/your/image"
  className="hero-image"
  ratio="none"
></TwicImg>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-svelte4?file=src%2Flib%2FTwicHero.svelte&initialpath=hero)


<div id='components-props'/>

## Components Properties
<div id='twic-img'/>

### `TwicImg`

This component can be used in place of an `img` element.

```html
<TwicImg
  src="<path>"
  alt="<String>"
  anchor="<String>"
  bot="<String>"
  eager="<boolean>"
  focus="<auto|coordinates>"
  intrinsic="<String>"
  mode="<contain|cover>"
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"
  bind:state="<String>"
  on:statechange="<function>"
  refit="<boolean|String>"
  step="<integer>"
  title="<String>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
  zoom="<String | Number>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | based on `src` |
| `anchor` | Positions the image in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied __after__ an eventual `preTransform`. When using `refit` in `cover` mode, `anchor` aligns the main object(s) with the given border side. | `String` |
| `bot` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed for search engine bots. This overrides all other transformations when provided, even if empty (i.e `bot=""`). See the [TwicPics bot attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-bot) for more information. | `String` | |
| `eager` | Load the image as soon as the component is mounted. This effectively means disabling lazy loading for this image.  | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `intrinsic` | Dimensions in pixels of the __original__ image, formatted `<width>x<height>` (eg. 1920x1080). It prevents image upscaling and limits the number of generated variants. If using `preTransform`, you should specify the intrinsic dimensions of the __resulting__ image. Using incorrect values can lead to display issues, see the [intrinsic attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-intrinsic).| `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` | 
| `position` | Positions the image in `contain` mode. `position` takes precedence over `anchor` when both are provided. Syntax is the same as for CSS position properties [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Only use this attribute if you need precise positionning: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String or number` | `1` |
| `refit` | Reframes the image to maximize the area occupied by the main object(s) while respecting `ratio` in `cover` mode. Crops the image as close as possible to the main object(s) in `contain` mode. Can be `true`, `false` or a list of comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) defining padding. See the [TwicPics refit documentation](https://www.twicpics.com/docs/reference/transformations#refit) for more information.| `boolean or String ` | `false` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `state` | A string property being update each time the asset loading state is updated. Values can be `new`, `loading`, `done` or `error`.| `String` | |
| `statechange` | A custom event dispatched each time the image loading state is updated. Emitted values can be `new`, `loading`, `done` or `error`.| `( e: CustomEvent ) => void` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `title` | `title` representing information related to the image. See [`global attribute title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title). | `String` | |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |
| `zoom` | Enables zoom feature and sets the magnification factor. Must be a number strictly greater than 1 as in `"1.5"` or `1.5`. When set to `'css'`, magnification factor is defined through the CSS variable `--twic-zoom`.Should only be applied to images in cover `mode`. See [Image magnifier](#image-magnifier).| `String | number` | `1` |
<div id='twic-video'/>

### `TwicVideo`

This component can be used in place of a `video` element.

```html
<TwicVideo
  src="<path>"
  anchor="<String>"
  bot="<String>"
  duration="<String|number>"
  eager="<boolean>"
  from="<String|number>"
  focus="<auto|coordinates>"
  intrinsic="<String>"
  mode="<contain|cover>"
  position="<css position>"
  posterFrom="<String|number>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"
  bind:state="<String>"
  on:statechange="<function>"
  step="<integer>"
  title="<String>"
  to="<String|number>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `anchor` | Positions the video in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied __after__ an eventual `preTransform`. | `String` |
| `bot` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed for search engine bots. This overrides all other transformations when provided, even if empty (i.e `bot=""`). See the [TwicPics bot attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-bot) for more information. | `String` | |
| `duration` | Limits the duration of the video. `duration` is expressed in seconds and must be a positive number. `duration` will not move the starting point of the video: to do so, you'll have to use the `from` property. See [duration documentation](https://www.twicpics.com/docs/reference/transformations#duration). | `String or number` | |
| `eager` | Load the video as soon as the component is mounted. This effectively means disabling lazy loading for this video.  | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `from` | Moves the starting point of the video. `from` is expressed in seconds and must be a positive number. `from` will not move the end point of the video: to do so, you'll have to use the `duration` or `to` properties. See from documentation. See [from documentation](https://www.twicpics.com/docs/reference/transformations#from). | `String or number` | |
| `intrinsic` | Dimensions in pixels of the __original__ video, formatted `<width>x<height>` (eg. 1920x1080). It prevents video upscaling and limits the number of generated variants. If using `preTransform`, you should specify the intrinsic dimensions of the __resulting__ video. Using incorrect values can lead to display issues, see the [intrinsic attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-intrinsic).| `String` | |
| `mode` | Can be `contain` or `cover` and determines if the video fills the area and is cropped accordingly (`cover`) or if the video will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` | 
| `position` | Positions the video in `contain` mode. `position` takes precedence over `anchor` when both are provided. Syntax is the same as for CSS position properties [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Only use this attribute if you need precise positionning: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | `center` |
| `posterFrom` | Determines which frame of the source video should be used as a poster / preview. `posterFrom` is expressed in seconds and must be a positive number. By default `posterFrom` is equal to 0, meaning the very first frame of the video is used. `posterFrom` will not modify the video in any way: to do so, you'll have to use the `duration`, `from` or `to` properties. | `String or number` | |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the video (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String or number` | `1` |
| `src` | Path to the video. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of the absent video. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `state` | A string property being update each time the asset loading state is updated. Values can be `new`, `loading`, `done` or `error`.| `String` | |
| `statechange` | A custom event dispatched each time the image loading state is updated. Emitted values can be `new`, `loading`, `done` or `error`.| `( e: CustomEvent ) => void` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `title` | `title` representing information related to the video. See [`global attribute title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title). | `String` | |
| `to` | Moves the end point of the video. `to` is expressed in seconds and must be a positive number. `to` will not move the starting point of the video: to do so, you'll have to use the `from` property. See [to documentation](https://www.twicpics.com/docs/reference/transformations#to). | `String or number` | |
| `transition` | Determines how the video will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |



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
  --twic-zoom:<number>;
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
| `--twic-zoom` | Strictly greater than 1 floating point value corresponding to the zoom factor to be applied. Only applies to `TwicImg` with `zoom` property set to `"CSS"`. | `number` | |

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-svelte4-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

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
[npm-image]: https://img.shields.io/badge/npm-v0.22.0-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.22.0