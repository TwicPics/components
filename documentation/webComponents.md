
![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.19.0/documentation/resources/webcomponents-cover.png)



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
    - [Responsive Example](#responsive-example)
    - [Style Driven Approach](#style-driven-approach)
    - [Working with ratio="none"](#ratio-none)
    - [Image magnifier](#image-magnifier)
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
<twic-img src="https://assets.twicpics.com/examples/football.jpg" />
```


__WARNING__: every single Shadow DOM the TwicPics components are descendants of must be opened. That's the only way the TwicPics Script will be able to reach them.

<a href="https://codesandbox.io/s/web-component-basic-19j1fm?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit web-component - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id="setting-up-your-project"/>

## Installation

Add the `@twicpics/components` package to your project:

```bash
# Using yarn
yarn add @twicpics/components

# Or using npm
npm install @twicpics/components
```


<div id='setup'/>

## Setup

**Note:** You will need a TwicPics domain to initialize the package. [Create an account for free](https://account.twicpics.com/signup) to get your domain.

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```jsx
// import TwicPics webcomponents
import { installTwicpics } from "@twicpics/components/webcomponents";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and the configuration part (see [Setup Options](#setup-options))

```js
installTwicpics( {
  // domain is mandatory
  "domain": `https://<your-domain>.twic.pics`
} );
```

into the main js file of your project.

```js
// Here is an example of a main file configured with TwicPics.
import { installTwicpics, TwicImg } from "@twicpics/components/webcomponents";

installTwicpics( {
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
    installTwicpics,
    TwicImg
  } from "./node_modules/@twicpics/components/webcomponents/module.mjs";

  installTwicpics({
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
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/docs/getting-started/fundamentals#domains-and-paths). Providing it is __mandatory__. | `String` | |
| `env` | Can be `debug`, `offline` or `production`. When set to `debug`, a gray lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of all medias targeted by their `src` value. When set to `offline`, these medias are replaced by a simple placeholder that allows to visualise their display area. | `String` | `"production"` |
| `handleShadowDom` | Must be set to `true` when using TwicComponents within a shadow DOM. | `boolean` | `false` |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | Path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
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

```html
<!-- page.html -->
<body>
    <twic-img src="path/to/your/image"/>
</body>
```

<div id='bulk-loading-with-twicview'/>

### Bulk loading with TwicView

By default, `<twic-img>` and `<twic-video>` will only start loading when they come into the viewport. But sometimes, you may want to load multiple assets in bulk instead of lazy loading them. This is where `<TwicView>` comes into play.

The `<TwicView>` components eager loads all of his `<twic-img>` and `<twic-video>` children as soon as it comes into the viewport (depending on your [anticipation settings](#setup-options).)

For example, if you're building a carousel, you might want to bulk load all images. In the following code, all three images will be loaded when `TwicView` comes into the viewport:

```html
<TwicView>
  <twic-img src="image1.jpg" />
  <twic-img src="image2.jpg" />
  <twic-img src="image3.jpg" />
</TwicView>
```

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)


```html
<!-- page.html -->
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

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
<!-- page.html -->
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

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and optimizing your _Cumulative Layout Shift_ (CLS) metric.


```html
<!-- page.html -->
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

<body>
  <main>
      <twic-img
        src="path/to/your/image"
        class="hero-image"
        ratio="none"
      ></twic-img>
  </main>
</body>
```

<a href="https://codesandbox.io/s/web-component-hero-image-7jdll8?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Web Component - Hero Image" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


### Image magnifier

The `<twic-img>` component allows to display a __lazy loaded__ zoomed version of your image on __mouse over__.

To activate the zoom feature, simply set the `zoom` property to a number strictly greater than 1. This number represents the magnification factor of your image.

For example: 

```html
  <twic-img src="image1.jpg" zoom="2" />
  <twic-img src="image2.jpg" zoom="2.5" />
```

The zoom factor can also be configured through the `--twic-zoom` [CSS variable](#css-variables).

To activate the [style-driven zoom](#style-driven-approach), simply set `zoom` property to `'css'` and add a new rule to your stylesheet. 

For example: 

```html
  <twic-img src="image3.jpg" zoom="css" class=".zoom-3"/>
```

```css
.zoom-3 {
  --twic-zoom:3;
}
```

It applies only to `twic-img` component in __cover__ `mode`.


<div id='components-props'/>

## Components Properties
<div id='twic-img'/>

### `twic-img`

This component can be used in place of an `img` element.

```html
<twic-img
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
| `anchor` | Positions the image in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied __after__ an eventual `preTransform`. | `String` |
| `bot` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed for search engine bots. This overrides all other transformations when provided, even if empty (i.e `bot=""`). See the [TwicPics bot attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-bot) for more information. | `String` | |
| `eager` | Load the image as soon as the component is mounted. This effectively means disabling lazy loading for this image.  | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `intrinsic` | Dimensions in pixels of the __original__ image, formatted `<width>x<height>` (eg. 1920x1080). It prevents image upscaling and limits the number of generated variants. If using `preTransform`, you should specify the intrinsic dimensions of the __resulting__ image. Using incorrect values can lead to display issues, see the [intrinsic attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-intrinsic).| `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` | 
| `position` | Positions the image in `contain` mode. `position` takes precedence over `anchor` when both are provided. Syntax is the same as for CSS position properties [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Only use this attribute if you need precise positionning: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String or number` | `1` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `title` | `title` representing information related to the image. See [`global attribute title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title). | `String` | |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |
| `zoom` | Enables zoom feature and sets the magnification factor. Must be a number strictly greater than 1 as in `"1.5"` or `1.5`. When set to `'css'`, magnification factor is defined through the CSS variable `--twic-zoom`.Should only be applied to images in cover `mode`. See [Image magnifier](#image-magnifier).| `String | number` | `1` |
<div id='twic-video'/>

### `twic-video`

This component can be used in place of a `video` element.

```html
<twic-video
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
| `--twic-zoom` | Strictly greater than 1 floating point value corresponding to the zoom factor to be applied. Only applies to `twic-img` with `zoom` property set to `"CSS"`. | `number` | |

<div id='example'/>

## Examples

You can find usage examples [in our sample project](https://github.com/twicpics/components/tree/main/samples/webcomponents).

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
[npm-image]: https://img.shields.io/badge/npm-v0.19.0-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.19.0