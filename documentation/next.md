
![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.29.3/documentation/resources/nextjs-cover.png)



- [Overview](#overview)
  - [What is TwicPics?](#what-is-twicpics)
  - [What is TwicPics Components?](#what-is-twicpics-components)
- [Installation](#installation)
- [Setup](#setup)
  - [Setting up TwicPics Components in your project](#installation)
  - [TwicInstall](#twicinstall)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Bulk loading with TwicView](#bulk-loading-with-twicview)
  - [Critical Images](#critical-images)
  - [Image magnifier](#image-magnifier)
  - [Lifecycle](#lifecycle)
  - [Refit Example](#refit-example)
  - [Responsive Example](#responsive-example)
  - [Style Driven Approach](#style-driven-approach)
  - [Working with ratio="none"](#working-with-rationone)
- [Components properties](#components-properties)
  - [TwicImg](#twicimg)
  - [TwicPicture](#twicpicture)
  - [TwicVideo](#twicvideo)
- [CSS variables](#css-variables)
- [Default Breakpoints](#default-breakpoints)
- [Examples](#examples)
- [Questions and feedback](#questions-and-feedback)
- [Other frameworks](#other-frameworks)
- [License](#license)


## Overview

### What is TwicPics?

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) is a **Responsive Media Service Solution** (SaaS) that enables **on-demand responsive image & video generation**.

With TwicPics, developers only deal with high-resolution versions of their media while end-users receive **optimized, perfectly sized, device-adapted** versions **delivered from a server close to them**.

TwicPics acts as a **proxy**. It retrieves your master file — from your web server, cloud storage, or DAM — and generates a **device-adapted** version with **best-in-class compression**, delivered directly to the end-user from the **closest available delivery point**.


### What is TwicPics Components?

**TwicPics Components** is a **collection of web components** that make it dead easy to unleash the power of [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) in your projects.

Whether you need to display a content image, showcase a short video, or ensure optimal performance with _Large Contentful Paint_ (LCP) care, TwicPics Components has you covered.

#### Display a Critical Image

If you need to display **critical images** with _art direction_ support, you can use the `<TwicPicture>` component.

It is a drop-in replacement for the standard `picture` tag and is based directly on the [TwicPics API](https://www.twicpics.com/docs/essentials/api?utm_source=github&utm_medium=organic&utm_campaign=components) without additional effort.


```html
<!-- Before -->
<picture>
  <source
    media="(min-width: 1280px)"
    srcset="wide-image.jpg, wide-image-2x.jpg 2x, wide-image-3x.jpg 3x"
  >
  <source
    media="(min-width: 768px)"
    srcset="squared-image.jpg, squared-image-2x.jpg 2x, squared-image-3x.jpg 3x"
  >
  <img
    srcset="portrait-image.jpg, portrait-image-2x.jpg 2x, portrait-image-3x.jpg 3x"
    src="portrait-image.jpg"
  >
</picture>

<!-- After -->
<TwicPicture
  src="your-master-image.jpg"
  ratio="3/4, @md 1, @xl 16/9"
/>
```

#### Display a Content Image

Suppose you want to display a **pixel-perfect image** with optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP), and lazy loading out of the box. In that case, you can use the `<TwicImg>` component.

It's a drop-in replacement for the standard `img` tag based on the [TwicPics Script](https://www.twicpics.com/docs/essentials/native?utm_source=github&utm_medium=organic&utm_campaign=components).

```html
<!-- Before -->
<img src="https://example.com/your-image.jpg" />

<!-- After -->
<TwicImg src="your-image.jpg" />
```

#### Display a Video

For seamless playback of [videos optimized with TwicPics](https://www.twicpics.com/docs/guides/video-optimization?utm_source=github&utm_medium=organic&utm_campaign=components), use the `<TwicVideo>` component. It's a sibling of `<TwicImg>` and serves as a drop-in replacement for the standard `video` tag.


```html
<!-- Before -->
<video >
  <source src="https://example.com/your-video.mp4" type="video/mp4">
  <!-- ... other video sources ... -->
</video>

<!-- After -->
<TwicVideo src="your-video.mp4" />
```


> [!NOTE]
> Discover our demonstrations and integration examples [in our online demo project](https://twicpics-next-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

## Installation

Add the `@twicpics/components` package to your project:

```bash
# Using yarn
yarn add @twicpics/components

# Or using npm
npm install @twicpics/components
```


## Setup

If you only want to use the **Next.js loader**, skip to [Next.js Image Loader](#nextjs-image-loader).

### Install TwicPics In Your Next.js Project

> [!NOTE]
> You will need a TwicPics domain to initialize the package. [Create an account for free](https://account.twicpics.com/signup?utm_source=github&utm_medium=organic&utm_campaign=components) to get your domain.

Configuration of `TwicPics Components` depends on your application's setup, whether you are using [Next Pages Router](#using-next-pages-router) or [Next App Router](#using-next-app-router-next-13).

#### Using Next Pages Router

```tsx
// pages/_app.tsx
...
import { TwicInstall } from "@twicpics/components/react";
import "@twicpics/components/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      { /* TwicPics Components configuration (see TwicInstall) */ }
      <TwicInstall
        // domain is mandatory
        domain='https://demo.twic.pics'
      />
      <Component {...pageProps} />
    </>
  );
}
```

#### Using Next App Router (Next 13+)

```tsx
// app/layout.tsx
import { TwicInstall } from "@twicpics/components/react";
import "@twicpics/components/style.css";

export default function RootLayout( { children }: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en">
      { /* TwicPics Components configuration (see TwicInstall) */ }
      <TwicInstall
        // domain is mandatory
        domain="https://<your-domain>.twic.pics"
      />
      <body>{children}</body>
    </html>
  );
}
```

### TwicInstall

This component configures `TwicPics Components` and must be placed in your project's entry point file.

```html
<TwicInstall
  domain="<String>"
  anticipation="<Number>"
  class="<String>"
  env="<debug|offline|production>"
  handleShadowDom="<boolean>"
  maxDPR="<Number>"
  path="<String>"
  step="<integer>"
/>
```

| Option | Description | Type | Default |
|:-|:-|:-|:-|
| `anticipation` | TwicPics will lazy-load images by default. To avoid too abrupt a transition with elements appearing into view and then images very obviously loading afterwards, TwicPics will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting. | `Number` | `0.2` |
| `breakpoints`| Customizes breakpoints value for responsive behavior. | `object` | `{ xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }` |
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/docs/getting-started/why-twicpics#domains-and-paths?utm_source=github&utm_medium=organic&utm_campaign=components). Providing it is **mandatory**. | `String` | |
| `env` | Can be `debug`, `offline` or `production`. When set to `debug`, a gray lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders?utm_source=github&utm_medium=organic&utm_campaign=components) that displays its intrinsic dimensions is displayed in place of all medias targeted by their `src` value. When set to `offline`, these medias are replaced by a simple placeholder that allows to visualise their display area. | `String` | `"production"` |
| `handleShadowDom` | Must be set to `true` when using TwicComponents within a shadow DOM. | `boolean` | `false` |
| `maxDPR` | TwicPics will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, TwicPics will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | Path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
| `step` | To avoid requesting too may variants of the same image, TwicPics will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

## Usage

### Basic Usage

```tsx
// MyComponent.tsx

import { TwicImg } from "@twicpics/components/react";

const YourTemplate = () => (
  <TwicImg src="path/to/your/image"/>
);

export default YourTemplate;
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Fbasic-grid%2Findex.jsx&initialpath=basic-grid)


### Critical Images

`TwicPicture` streamlines the use of `picture` elements and `srcset` attributes.

It operates independently of the [TwicPics Script](https://www.twicpics.com/docs/essentials/native) and dynamically generates `source` elements and `srcset` attributes from a single master file using variants transformed through the [TwicPics API](https://www.twicpics.com/docs/essentials/api).

#### Resolution switching

The following examples illustrate how to serve different resolutions of the same image according to `breakpoints` and `maxDPR` defined in [TwicInstall](#twicinstall).

```html
<!-- Populate srcset and fallback with a list of squared variants -->
<TwicPicture src="your-lcp-image.jpg"></TwicPicture>
```

```html
<!-- Populate srcset and fallback with a list of 16/9 variants -->
<TwicPicture
  src="your-lcp-image.jpg"
  ratio="16/9"
></TwicPicture>
```

```html
<!-- eager disables lazy-loading and sets fetchpriority to high -->
<TwicPicture
  src="your-lcp-image.jpg"
  eager
></TwicPicture>
```

```html
<!-- for best performances set sizes attribute is a best practice -->
<TwicPicture
  src="your-lcp-image.jpg"
  eager
  sizes="
    (min-width: 1000px) 33vw,
    96vw
  "
></TwicPicture>
```

For a comprehensive list of properties and detailed information, please refer to [TwicPicture](#twicpicture).

<a name="art-direction"></a>
#### Art Direction

To achieve _art direction_, configure the following `TwicPicture`'s properties following the **mobile-first principle**:

- anchor
- focus
- mode
- position
- ratio

The following examples illustrate how to serve various image variations based on distinct _artistic directions_ and [default breakpoint values](#default-breakpoints):

```html
<!--
  This will display a :
  squared variant (default ratio) for screen with a width < 1024 px
  4/3 variant for screen with a width >= 1024 px
  21/9 variant for screen with a width >= 1280 px
-->
<TwicPicture
  src="art.jpg"
  alt="Art Direction Example"
  ratio="
    @lg 4/3
    @xl 21/9
  "
/>

<!--
  This allows to change the focus point for screen with a width >= 1280 px
-->
<TwicPicture
  src="art.jpg"
  alt="Art Direction Example"
  ratio="
    @lg 4/3
    @xl 21/9
  "
  focus="@xl top"
/>

<!--
  You can also configure a custom breakpoint
-->
<TwicPicture
  src="art.jpg"
  alt="Art Direction Example"
  ratio="
    @lg 4/3
    @xl 21/9
  "
  focus="
    @666 bottom
    @xl top
  "
/>
```

[Default breakpoint values](#default-breakpoints) can be configured [here](#twicinstall).


### Bulk loading with TwicView

By default, `<TwicImg>` and `<TwicVideo>` will only start loading when they enter the viewport. But sometimes, you may want to load multiple assets in bulk instead of lazy loading them. This is where `<TwicView>` comes into play.

The `<TwicView>` component eagerly loads all of his `<TwicImg>` and `<TwicVideo>` children as soon as it enters the viewport (depending on your [anticipation settings](#twicinstall).)

For example, if you're building a carousel, you might want to bulk-load all images. In the following code, all three images will be loaded when `TwicView` comes into the viewport:

```html
<TwicView>
  <TwicImg src="image1.jpg" />
  <TwicImg src="image2.jpg" />
  <TwicImg src="image3.jpg" />
</TwicView>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages/bulk-loading/index.jsx&initialpath=bulk-loading)


### Image magnifier

The `<TwicImg>` component lets you display a **lazy loaded**, zoomed version of your image on **mouseover**.

To activate the zoom feature, set the `zoom` property to a number strictly greater than 1. This number represents the magnification factor of your image.

For example:

```html
  <TwicImg src="image1.jpg" zoom="2" />
  <TwicImg src="image2.jpg" zoom="2.5" />
```

The zoom factor can also be configured through the `--twic-zoom` [CSS variable](#css-variables).

To activate the [style-driven zoom](#style-driven-approach), set the `zoom` property to `'css'` and add a new rule to your stylesheet.

For example:

```html
  <TwicImg src="image3.jpg" zoom="css" class=".zoom-3"/>
```

```css
.zoom-3 {
  --twic-zoom:3;
}
```

It applies only to the `TwicImg` component in **cover** `mode`.


[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%zoom%2Findex.jsx&initialpath=zoom)

### Lifecycle

For the `TwicImg` and the `TwicVideo` components, passing a callback function to `onStateChange` gives access to your image or video loading state.

Here are the values the Component will emit ([see State Type definition](#loading-state-values)):

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source

```js
  // component.jsx
  const [ state, setState ] = useState( undefined );
  
  const handleStateChange = ( stateEvent ) => {
    // Implement the logic here
    const { state } = stateEvent;
    console.log( `TwicComponent emits a new state`, state );
    setState( state );
  }

  return (
    <TwicImg
      onStateChange={handleStateChange}
      src="path/to/your/image"
    />
  )
```

> [!WARNING]
> When using `onStateChange` in a **Server Components module graph**, your component must be decorated with [use client directive](https://nextjs.org/docs/getting-started/react-essentials#the-use-client-directive), as in:

```js
  'use client'
  
  // your imports

  const [ state, setState ] = useState( undefined );
  
  const handleStateChange = ( stateEvent ) => {
    // Implement the logic here
    const { state } = stateEvent;
    console.log( `TwicComponent emits a new state`, state );
    setState( state );
  }

  return (
    <TwicImg
      onStateChange={handleStateChange}
      src="path/to/your/image"
    />
  )
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Fstate%2Findex.jsx&initialpath=state)


### Refit example

`<TwicImg>` and `<TwicPicture>` components allow to **reframe** your image on the **main subject(s)** they contain.

In **cover** `mode`, the resulting image will respect the `ratio` while maximizing the area occupied by the main subject(s).

In **contain** `mode`, the image is cropped as close as possible to the main subject(s).

To activate automatic cropping, add the `refit` property to your component.

By default, the subject will be placed at the center of the resulting image, but it is possible to align the subject with a given border by specifying an `anchor`.

Also, by default, the subject will touch the borders of the resulting image. This can be avoided by setting `refit` with a comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) value defining padding.

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Frefit%2Findex.jsx&initialpath=refit)

### Style-Driven Approach

You can set up `TwicImg` and `TwicVideo` components using pure CSS and the power of [CSS variables](#css-variables).

#### CSSS

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

#### Template

```html
<div className="landscape">
  <TwicImg src="path/to/your/image"/>
</div>
<div className="square">
  <TwicImg src="path/to/your/image"/>
</div>
<div className="portrait">
  <TwicImg src="path/to/your/image"/>
</div>
<div className="contain left">
  <TwicImg src="path/to/your/image" ratio="16/9"/>
</div>
<div className="contain right">
  <TwicImg src="path/to/your/image" ratio="16/9"/>
</div>
<!---
    Attributes take precedence over CSS.
    In the next example, ratio will 16/9 AND NOT 1 as defined in square css class 
--->
<div className="cover square">
  <TwicImg src="path/to/your/image" ratio="16/9"/>
</div>
```

#### Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages/style-driven/index.jsx&initialpath=style-driven)

### Responsive Example

Setting up `TwicImg` and `TwicVideo` components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

Your template features a single component that will follow your CSS directives and behave responsively.


```css
/* styles.css */

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

Now, your template can feature a single component that follows your CSS directives and behaves responsively.

```jsx
// MyComponent.jsx

import 'style.css'

export default function() {
  return (
    <TwicImg
      className="style-driven"
      src="path/to/your/image"
    />
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Fart-directions%2Findex.jsx&initialpath=art-directions)

### Working with ratio="none"

#### With TwicPicture

It is helpful if you want to display an image with its intrinsic aspect ratio without cropping.

When using `ratio="none"`, there is no CLS optimization, and you are responsible for it.

```html
<!-- will display your image with it's intrinsic ratio, without any cropping -->
<TwicPicture>
  src="path/to/your/image"
  ratio="none"
</TwicPicture>
```

#### With TwicImg and TwicVideo

It is particularly useful when creating a "hero" banner. You can specify the height of your image while respecting its natural aspect ratio, and optimizing your _Cumulative Layout Shift_ (CLS) metric.

When using `ratio="none"`, you are responsible for properly sizing the component.

```css
/* style.css */

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

```jsx
// MyComponent.jsx

<TwicImg
  src="path/to/your/image"
  className="hero-image"
  ratio="none"
/>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Fhero%2Findex.jsx&initialpath=hero)


## Components Properties
### TwicImg

This component is a drop-in replacement for the `img` tag dedicated to content images.

It offers advanced features like optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP), and lazy loading out of the box.


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
  onStateChange="<function>"
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"
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
| `alt` | `alt` attribute content | `String` | |
| `anchor` | Positions the image in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied **after** an eventual `preTransform`. When using `refit` in `cover` mode, `anchor` aligns the main object(s) with the given border side. | `String` | |
| `bot` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed for search engine bots. This overrides all other transformations when provided, even if empty (i.e `bot=""`). See the [TwicPics bot attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-bot) for more information. | `String` | |
| `eager` | Load the image as soon as the component is mounted. This effectively means disabling lazy loading for this image. | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positioning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `intrinsic` | Dimensions in pixels of the **original** image, formatted `<width>x<height>` (eg. 1920x1080). It prevents image upscaling and limits the number of generated variants. If using `preTransform`, you should specify the intrinsic dimensions of the **resulting** image. Using incorrect values can lead to display issues, see the [intrinsic attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-intrinsic).| `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` | 
| `onStateChange` | A callback function triggered each time the asset loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`( stateEvent: StateEvent ) => void`](#loading-state-values) | |
| `position` | Positions the image in `contain` mode. `position` takes precedence over `anchor` when both are provided. Syntax is the same as for CSS position properties [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Only use this attribute if you need precise positionning: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied **after** `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String or number` | `1` |
| `refit` | Reframes the image to maximize the area occupied by the main object(s) while respecting `ratio` in `cover` mode. Crops the image as close as possible to the main object(s) in `contain` mode. Can be `true`, `false` or a list of comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) defining padding. See the [TwicPics refit documentation](https://www.twicpics.com/docs/reference/transformations#refit) for more information.| `boolean or String` | `false` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#twicinstall) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `title` | `title` representing information related to the image. See [`global attribute title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title). | `String` | |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |
| `zoom` | Enables zoom feature and sets the magnification factor. Must be a number strictly greater than 1 as in `"1.5"` or `1.5`. When set to `'css'`, magnification factor is defined through the CSS variable `--twic-zoom`.Should only be applied to images in cover `mode`. See [Image magnifier](#image-magnifier).| `String | number` | `1` |
### TwicPicture

This component serves as a seamless replacement for the `picture` element.

With a primary focus on maximizing the _Largest Contentful Paint_ (LCP) score with optimized _Cumulative Layout Shift_ (CLS), it effortlessly generates the `srcset` and `source` attributes for _resolution switching_ and _art direction_, all derived from a **single master file** transformed through the [TwicPics API](https://www.twicpics.com/docs/essentials/api).


```html
<TwicPicture
  src="<path>"
  alt="<String>"
  anchor="<String>"
  eager="<boolean>"
  fetchpriority="<high|low|auto>"
  focus="<auto|coordinates>"
  mode="<contain|cover>"
  position="<String>"
  preTransform="<String>"
  ratio="<ratio>"
  refit="<boolean|String>"
  sizes="<String>"
  title="<String>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | |
| `anchor` | Positions the image in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied **after** an eventual `preTransform`. [Can be set at different breakpoints](#art-direction). | `String` |
| `eager` | Load the image as soon as the `picture` element is processed and set `fetchpriority` to `high`. This effectively means disabling lazy loading for this image. Recommended for optimal Largest Contentful Paint (LCP) display. | `boolean` | `false` |
| `fetchpriority` | Acts as standard [fetchpriority property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority). Can be `high`, `low`or `auto`. Defaults to `high` when `eager` is true. | `string` | |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. [Can be set at different breakpoints](#art-direction). | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). [Can be set at different breakpoints](#art-direction). | `String` | `cover` |
| `position` | Positions the image in `contain` mode. `position` takes precedence over `anchor` when both are provided. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. [Can be set at different breakpoints](#art-direction). | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied **after** `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, the image is displayed with its intrinsic aspect ratio. In this case, you are responsible for optimizing the Cumulative Layout Shift (CLS). [Can be set at different breakpoints](#art-direction). | `String or number` | `1` |
| `refit` | Reframes the image to maximize the area occupied by the main object(s) while respecting `ratio` in `cover` mode. Crops the image as close as possible to the main object(s) in `contain` mode. Can be `true`, `false` or a list of comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) defining padding. See the [TwicPics refit documentation](https://www.twicpics.com/docs/reference/transformations#refit) for more information.| `boolean or String` | `false` |
| `sizes` | Specifies the layout width of the image for each breakpoints using media query syntax. The value of this parameter has a significant impact on performance. Ensure to configure it carefully. See [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes).| `String` | |
| `src` | Path to the image. | `String` | |
| `title` | `title` representing information related to the image. See [`global attribute title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title). | `String` | |
### TwicVideo

This component is a drop-in replacement for `video`.

It provides seamless playback for [videos optimized with TwicPics](https://www.twicpics.com/docs/guides/video-optimization), offering advanced features like optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP), and lazy loading out of the box.

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
| `anchor` | Positions the video in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right` and `center`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied **after** an eventual `preTransform`. When using `refit` in `cover` mode, `anchor` aligns the main object(s) with the given border side. | `String` | |
| `bot` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed for search engine bots. This overrides all other transformations when provided, even if empty (i.e `bot=""`). See the [TwicPics bot attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-bot) for more information. | `String` | |
| `duration` | Limits the duration of the video. `duration` is expressed in seconds and must be a positive number. `duration` will not move the starting point of the video: to do so, you'll have to use the `from` property. See [duration documentation](https://www.twicpics.com/docs/reference/transformations#duration). | `String or number` | |
| `eager` | Load the video as soon as the component is mounted. This effectively means disabling lazy loading for this video. | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positioning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `from` | Moves the starting point of the video. `from` is expressed in seconds and must be a positive number. `from` will not move the end point of the video: to do so, you'll have to use the `duration` or `to` properties. See from documentation. See [from documentation](https://www.twicpics.com/docs/reference/transformations#from). | `String or number` | |
| `intrinsic` | Dimensions in pixels of the **original** video, formatted `<width>x<height>` (eg. 1920x1080). It prevents video upscaling and limits the number of generated variants. If using `preTransform`, you should specify the intrinsic dimensions of the **resulting** video. Using incorrect values can lead to display issues, see the [intrinsic attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-intrinsic).| `String` | |
| `mode` | Can be `contain` or `cover` and determines if the video fills the area and is cropped accordingly (`cover`) or if the video will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` | 
| `onStateChange` | A callback function triggered each time the asset loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`( stateEvent: StateEvent ) => void`](#loading-state-values) | |
| `position` | Positions the video in `contain` mode. `position` takes precedence over `anchor` when both are provided. Syntax is the same as for CSS position properties [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Only use this attribute if you need precise positionning: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | `center` |
| `posterFrom` | Determines which frame of the source video should be used as a poster / preview. `posterFrom` is expressed in seconds and must be a positive number. By default `posterFrom` is equal to 0, meaning the very first frame of the video is used. `posterFrom` will not modify the video in any way: to do so, you'll have to use the `duration`, `from` or `to` properties. | `String or number` | |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the video (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied **after** `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String or number` | `1` |
| `src` | Path to the video. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of the absent video. When [env](#twicinstall) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `title` | `title` representing information related to the video. See [`global attribute title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title). | `String` | |
| `to` | Moves the end point of the video. `to` is expressed in seconds and must be a positive number. `to` will not move the starting point of the video: to do so, you'll have to use the `from` property. See [to documentation](https://www.twicpics.com/docs/reference/transformations#to). | `String or number` | |
| `transition` | Determines how the video will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |




### Loading State Values

Union type for all possible image or video loading states:

```ts
type State = `error` | `done` | `loading` | `new`;
```

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source

### State Change Event

Data type passed as a parameter to the `onStateChange` function:

```ts
export type StateEvent = {
  target: TwicImg | TwicVideo,
  state: State
};
```


## CSS Variables

List of variables that can be used to configure your components using pure CSS:

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

Each CSS variable corresponds to one of the components attributes listed in the [Components Properties section](#components-properties). If present, the attribute takes precedence over the corresponding CSS variable.

| Variable | Description | HTML Attribute | Default |
|:-|:-|:-|:-|
| `--twic-mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `mode` | `cover` |
| `--twic-position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `position` | `center` |
| `--twic-ratio` | Floating point value corresponding to a unitless `width/height` ratio (as in `calc(4/3)` or `1.333`). Ratio will correspond to a square area by default. | `ratio` | `1` |
| `--twic-transition-delay` | [Transition delay of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) | `transitionDelay` | `0ms` |
| `--twic-transition-duration` | [Duration of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) | `transitionDuration` | `400ms` |
| `--twic-transition-timing-function` | [CSS timing function applied to the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) | `transitionTimingFunction` | `ease` |
| `--twic-zoom` | Strictly greater than 1 floating point value corresponding to the zoom factor to be applied. Only applies to `TwicImg` with `zoom` property set to `"CSS"`. | `number` | |

## Default Breakpoints

There are six default breakpoints, each corresponding to common device resolutions:

| Breakpoint | Size (pixels) |
|:-|:-|
| `xs` | 320 |
| `sm` | 640 |
| `md` | 768 |
| `lg` | 1024 |
| `xl` | 1280 |
| `2xl` | 1536 |

These values are customizable during component configuration. Refer to [TwicInstall](#twicinstall).


## Next.js Image Loader

> [!IMPORTANT]
> You will need a TwicPics domain to initialize the package. [Create an account for free](https://account.twicpics.com/signup?utm_source=github&utm_medium=organic&utm_campaign=components) to get your domain.


If it does not exist, create a `.env` file at the root of your project. 

Set the `NEXT_PUBLIC_TWICPICS_DOMAIN` environment variable to your own [Twicpics domain](https://www.twicpics.com/docs/getting-started/why-twicpics#domains-and-paths):


```bash
NEXT_PUBLIC_TWICPICS_DOMAIN="https://<your-domain>.twic.pics/"
```

### Basic Usage

The example below shows how to use the TwicPics loader:

```jsx
// MyComponent.jsx

import Image from 'next/image'
import { twicpicsLoader } from "@twicpics/components/next";

const MyImage = (props) => {
  return (
    <Image
      loader={twicpicsLoader}
      src="image.jpg"
      alt="Image alt description"
      width={500}
      height={500}
    />
  )
}
```

Please note that this will stretch the image to fit the specified size, which might not match the desired aspect ratio.

For more straightforward aspect ratio management, consider using the `<TwicImg>` component (see [Setup](#setup)). This will also give you access to all [TwicPics features](https://www.twicpics.com/docs/reference/transformations) like smart-cropping, automatic next-gen formats, and more.

### Using Placeholders

> [!WARNING]
> This is only supported from Next.js 13.

The Next Image component allows to implement [low quality image placeholders](https://www.twicpics.com/docs/guides/image-best-practices#lqip--blurry-image-placeholder) by setting the `placeholder` prop to `blur`.

When doing so, we need to set the `blurDataURL` prop. This prop expects the URL of a Base64-encoded image. TwicPics provides a `twicpicsPlaceholder` helper that returns such URL.

```jsx
import Image from 'next/image'
import { twicpicsLoader, twicpicsPlaceholder } from "@twicpics/components/next";

// In this example, we're generating the placeholder URL on server-side
export async function getServerSideProps() {
  const data = {
    src: `image.jpg`,
  };
  datas.blurDataURL = await twicpicsPlaceholder(data.src);
  return {
    props: {
      data,
    },
  };
}

const MyImage = ({ data }) => {
  return (
    <Image
      loader={twicpicsLoader}
      src={data.src}
      placeholder="blur"
      blurDataURL={data.blurDataURL}
      alt="Image alt description"
    />
  )
}
```

## Examples

You can find usage examples [in our online demo project](https://twicpics-next-demo.netlify.app?utm_source=github&utm_campaign=components&utm_medium=organic).


## Questions and feedback

Feel free to submit an [issue](https://github.com/TwicPics/components/issues) or ask us anything by emailing [support@twic.pics](mailto:support@twic.pics).


## Other frameworks

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) provides the most versatile solution on the market for delivering responsive media.

TwicPics Components are available [in the most popular Javascript frameworks](https://www.npmjs.com/package/@twicpics/components).


## License

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

[license-image]: https://img.shields.io/npm/l/@twicpics/components.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/twicpics/components/master/LICENSE
[npm-image]: https://img.shields.io/badge/npm-v0.29.3-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.29.3

