







![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.14.2/documentation/resources/angular-cover.png)



- [Overview](#about)
    - [What is TwicPics ?](#what-is-twicpics)
    - [What is TwicPics Components ?](#what-is-twicpics-components)
- [Installation](#installation)
- [Setup](#setup)
    - [Setting-up TwicPics Components into your project](#setting-up-your-project)
    - [Setup Options](#setup-options)
- [Usage](#usage)
    - [Basic usage](#basic-usage)
    - [Bulk loading with TwicView](#bulk-loading-with-twicview)
    - [Style Driven Approach](#style-driven-approach)
    - [Responsive Example](#responsive-example)
    - [Working with ratio="none"](#ratio-none)
    - [Lifecycle](#lifecycle)
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


Discover our demonstrations and integration examples [in our online demo project](https://twicpics-angular-demo.netlify.app/home?utm_source=github&utm_campaign=components&utm_medium=organic).

TwicPics Components are available in Angular __version 11 to 14_.

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

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Angular` project

TwicPics components for `Angular` comes as an `Angular Module` and is configured as [such](https://angular.io/guide/architecture-modules).

**Note:** You will need a TwicPics domain to initialize the package. [Create an account for free](https://account.twicpics.com/signup) to get your domain.

<div id='module-declaration'/>

#### Module declaration in `app.module.ts`

You need to import the TwicPicsComponentsModule within your `app.module.ts` file.

__WARNING__: while importing angular components or module, you will have to select the targeted version.

eg :
```ts
// imports TwicPicsComponentsModule
import { TwicPicsComponentsModule } from "@twicpics/components/angular11"
``` 

Add the import part

```ts
// import TwicPics Angular Module
import { TwicPicsComponentsModule } from "@twicpics/components/angular<your-targeted-version>"
```

and the usage declaration of the module

```ts
@NgModule( {
  "imports": [
    TwicPicsComponentsModule,
  ],
} )
```

```ts
// here is an example of a `app.module.ts` configured with TwicPics.
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TwicPicsComponentsModule } from "@twicpics/components/angular14";

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

#### TwicPics Components Configuration in `app.component.ts`

The configuration part (see [Setup Options](#setup-options)) is done in `app.component.ts`.

__WARNING__: here again, you will have to select the targeted version while importing angular components. 

```ts
//here is an example of a `Angular` app.component.ts configured with TwicPics.
import { Component } from "@angular/core";
import { installTwicpics } from "@twicpics/components/angular14";
@Component( {
  "selector": "app-root",
  "templateUrl": "./app.component.html",
} )
export class AppComponent {
}

// TwicPics Components configuration (see Setup Options)
installTwicpics( {
  "domain": "https://<your-domain>.twic.pics",
  "anticipation": 0.5,
  "step": 100,
} );
```

<div id='setup-options'/>

### Setup Options

| Option | Description | Type | Default |
|:-|:-|:-|:-|
| `anticipation` | [TwicPics](https://www.twicpics.com/) will lazy-load images by default. To avoid too abrupt a transition with elements appearing into view and then images very obviously loading afterwards, [TwicPics](https://www.twicpics.com/) will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting. | `Number` | `0.2` |
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/documentation/subdomain/). Providing it is __mandatory__. | `String` | |
| `env` | Can be `debug`, `offline` or `production`. When set to `debug`, a gray lightweight `svg` [placeholder](https://www.twicpics.com/docs/api/placeholders) that displays its intrinsic dimensions is displayed in place of all medias targeted by their `src` value. When set to `offline`, these medias are replaced by a simple placeholder that allows to visualise their display area. | `String` | `"production"` |
| `handleShadowDom` | Must be set to `true` when using TwicComponents within a shadow DOM. | `boolean` | `false` |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | Path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
| `step` | To avoid requesting too may variants of the same image, [TwicPics](https://www.twicpics.com/) will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

<div id='usage'/>

## Usage

`TwicImg` and `TwicVideo` are available for use in the scope of the module into which you have imported `TwicPicsComponentsModule` [see Module Declaration](#module-declaration).

Just use them in your template files in place of `img` or `video` tags.

```html
<!-- component.html -->
<TwicImg src="path/to/your/image"></TwicImg>
```

<div id='basic-usage'/>

### Basic usage

```html
<!-- component.html -->
<main>
  <TwicImg src="path/to/your/image"/>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-basic-grid%2Ftwic-basic-grid.component.html&initialpath=basic-grid)

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-bulk-loading%2Ftwic-bulk-loading.component.html&initialpath=bulk-loading)

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`<your-component-within-app.module>.component.css`

```css
.landscape {
  --twic-ratio: calc(4/3);
}

.portrait {
  --twic-ratio: calc(3/4);
}

.square {
  --twic-ratio: calc(1);
}

.contain {
  --twic-mode: contain;
}

.cover {
  --twic-mode: cover;
}

.left {
  --twic-position: left;
}

.right {
  --twic-position: right;
}

.lg {
  width:300px;
}

.md {
  width:150px;
}

.sm {
  width: 100px;
}
```

```html
<!-- component.html -->
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
  <div class="contain left">
    <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
  </div>
  <div class="contain right">
    <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
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
  <!---
  Attributes take precedence over CSS.
  In the next example, ratio will 16/9 AND NOT 1 as defined in square css class 
  --->
  <div className="cover square">
    <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
  </div>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-style-driven%2Ftwic-style-driven.component.html&initialpath=style-driven)


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

`<your-component-within-app.module>.component.css`

```css
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

```

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
<!-- component.html -->
<main>
  <div class="style-driven-responsive">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-art-direction%2Ftwic-art-direction.component.html&initialpath=art-direction)

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and optimizing your _Cumulative Layout Shift_ (CLS) metric.

`styles.css`

```css
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
```

`<your-page-or-component>.html`

```html
<TwicImg
  src="path/to/your/image"
  class="hero-image"
  ratio="none"
></TwicImg>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-hero%2Ftwic-hero.component.html&initialpath=hero)

<div id='lifecycle'/>

### Lifecycle

Binding to `stateChangeEvent` gives access to the loading state of your image or video.

Here are the values the Component will emit ([see State Type definition](#state-type)) :

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


```html
<!-- component.html -->
<TwicImg
  src="path/to/your/image"
  (stateChangeEvent)="handleStateChange($event)"
></TwicImg>
```

```ts
  // component.ts
  import { ChangeDetectorRef, Component } from "@angular/core";
  import { State, StateEvent, TwicImgComponent } from "@twicpics/components/angular13";

  export class Component {

  state?: State;

  constructor(private changeDetector: ChangeDetectorRef) { }

  handleStateChange = (stateEvent: StateEvent) => {
    // Implement the logic here
    const { state, target } = stateEvent;
    const _target = target as TwicImgComponent;
    // eslint-disable-next-line no-console
    console.log( `TwicComponent emits a new state`, state );
    // eslint-disable-next-line no-console
    console.log( `TwicComponent source was`, _target.src );
    this.state = state;
    this.changeDetector.detectChanges();
  }
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src/app/twic-state/twic-state.component.html&initialpath=state)

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
  (stateChangeEvent)="<function>"
  step="<integer>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | based on `src` |
| `anchor` | Positions the image in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied __after__ an eventual `preTransform`. | `String` |
| `bot` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/api/transformations) to be performed for search engine bots. This overrides all other transformations when provided, even if empty (i.e `bot=""`). See the [TwicPics bot attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-bot) for more information. | `String` | |
| `eager` | Load the image as soon as the component is mounted. This effectively means disabling lazy loading for this image.  | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `intrinsic` | Dimensions in pixels of the __original__ image, formatted `<width>x<height>` (eg. 1920x1080). It prevents image upscaling and limits the number of generated variants. If using `preTransform`, you should specify the intrinsic dimensions of the __resulting__ image. Using incorrect values can lead to display issues, see the [intrinsic attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-intrinsic).| `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `position` | Positions the image in `contain` mode. `position` takes precedence over `anchor` when both are provided. Syntax is the same as for CSS position properties [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Only use this attribute if you need precise positionning: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/api/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/api/manipulations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String` | `1` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/api/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `stateChangeEvent` | An event emitter triggered each time the image loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`EventEmitter<StateEvent>`](#state-event-type) | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

<div id='twic-video'/>

### `TwicVideo`

This component can be used in place of a `video` element.

```html
<TwicVideo
  src="<path>"
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
  (stateChangeEvent)="<function>"
  step="<integer>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | based on `src` |
| `anchor` | Positions the video in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied __after__ an eventual `preTransform`. | `String` |
| `bot` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/api/transformations) to be performed for search engine bots. This overrides all other transformations when provided, even if empty (i.e `bot=""`). See the [TwicPics bot attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-bot) for more information. | `String` | |
| `eager` | Load the image as soon as the component is mounted. This effectively means disabling lazy loading for this image.  | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `intrinsic` | Dimensions in pixels of the __original__ video, formatted `<width>x<height>` (eg. 1920x1080). It prevents video upscaling and limits the number of generated variants. If using `preTransform`, you should specify the intrinsic dimensions of the __resulting__ video. Using incorrect values can lead to display issues, see the [intrinsic attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-intrinsic).| `String` | |
| `mode` | Can be `contain` or `cover` and determines if the video fills the area and is cropped accordingly (`cover`) or if the video will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `position` | Positions the video in `contain` mode. `position` takes precedence over `anchor` when both are provided. Syntax is the same as for CSS position properties [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Only use this attribute if you need precise positionning: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/api/transformations) to be performed before resizing the video (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/api/manipulations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String` | `1` |
| `src` | Path to the video. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/api/placeholders) that displays its intrinsic dimensions is displayed in place of the absent video. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `stateChangeEvent` | An event emitter triggered each time the video loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`EventEmitter<StateEvent>`](#state-event-type) | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Determines how the video will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

### Anchor Type

Union type for all possible values on `anchor` property.

```ts
type Anchor = `bottom` | `bottom-left` | `bottom-right` | `center` | `left` | `top` | `top-left` | `top-right` | `right`;
```

#### Usage

To dynamically set the `anchor` property in `TwicImg` (or `TwicVideo`) component you must declare a variable of type `Anchor`.

```ts
// component.ts
import { Anchor } from "@twicpics/components/angular14";

@Component({
  selector: ...,
  templateUrl: ...,
  styleUrls: ...,
})
export class YourComponent {
  yourAnchorVariable:Anchor = `top-left`;
}
```

```html
<!-- component.html -->
<TwicImg src="path/to/your/image" [anchor]="yourAnchorVariable"></TwicImg>
```


### Mode Type

Union type for all possible values on `mode` property.

```ts
type Mode = `contain` | `cover`;
```

#### Usage

To dynamically set the `mode` property in `TwicImg` (or `TwicVideo`) component you must declare a variable of type `Mode`.

```ts
// component.ts
import { Mode } from "@twicpics/components/angular14";

@Component({
  selector: ...,
  templateUrl: ...,
  styleUrls: ...,
})
export class YourComponent {
  yourModeVariable:Mode = `contain`;
}
```

```html
<!-- component.html -->
<TwicImg src="path/to/your/image" [mode]="yourModeVariable"></TwicImg>
```

### Placeholder Type

Union type for all possible values on `placeholder` property.

```ts
type Placeholder = `maincolor` | `meancolor` | `none` | `preview`;
```

#### Usage

To dynamically set the `mode` property in `TwicImg` (or `TwicVideo`) component you must declare a variable of type `Placeholder`.

```ts
  // component.ts
  import { Placeholder } from "@twicpics/components/angular14";

  @Component({
    selector: ...,
    templateUrl: ...,
    styleUrls: ...,
  })
  export class YourComponent {
    yourPlaceholderVariable:Placeholder = `none`;
}
```

```html
<!-- component.html -->
<TwicImg
  src="path/to/your/image" 
  [placeholder]="yourPlaceholderVariable">
</TwicImg>
```

<div id='state-type'/>

### Loading State Values

Union type for all possible state values emitted through `@output` property `stateChangeEvent`.

```ts
type State = `error` | `done` | `loading` | `new`;
```

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


<div id='state-event-type'/>

### State Change Event

Data type emitted by `@output` property `stateChangeEvent`.

```ts
export type StateEvent = {
  target: TwicImgComponent | TwicVideoComponent,
  state: State
};
```


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

You can find usage examples [in our online demo project](https://twicpics-angular-demo.netlify.app/home?utm_source=github&utm_campaign=components&utm_medium=organic).

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
[npm-image]: https://img.shields.io/badge/npm-v0.14.2-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.14.2