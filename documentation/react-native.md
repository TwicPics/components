
![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.17.3/documentation/resources/react-native-cover.png)



## Contents

- [Contents](#contents)
- [Overview](#overview)
- [Setup](#setup)
  - [Install TwicPics in your React Native project](#install-twicpics-in-your-react-native-project)
  - [Setup Options](#setup-options)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Working with ratio="none"](#working-with-rationone)
- [Components Props](#components-props)
- [Examples](#examples)
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


## Installation

Add the `@twicpics/components` package to your project:

```bash
# Using yarn
yarn add @twicpics/components

# Or using npm
npm install @twicpics/components
```


## Setup

### Install TwicPics in your React Native project

**Note:** You will need a TwicPics domain to initialize the package. [Create an account for free](https://account.twicpics.com/signup) to get your domain.

This example uses ES module imports, but TwicPics Components is compatible with CommonJS and `require` statements.

```js
// App.js

import { installTwicpics } from '@twicpics/components/react-native';

installTwicpics({
  "domain": `https://<your-domain>.twic.pics/`,
});

export default function App() {
  return (
    // your app code
  )
}
```

For an exhaustive list of options, see [Setup Options](#setup-options).

### Setup Options

| Option | Description | Type | Default |
|:-|:-|:-|:-|
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/docs/getting-started/fundamentals#domains-and-paths). Providing it is __mandatory__. | `String` | |
| `env` | Can be `debug`, `offline` or `production`. When set to `debug`, a gray lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of all medias targeted by their `src` value. When set to `offline`, these medias are replaced by a simple placeholder that allows to visualise their display area. | `String` | `"production"` |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | Path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
| `step` | To avoid requesting too may variants of the same image, [TwicPics](https://www.twicpics.com/) will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

## Usage

> Note: `<TwicVideo>` is not supported yet for React Native.

### Basic usage

```jsx
// MyComponent.jsx

import { TwicImg } from "@twicpics/components/react-native";

const MyComponent = () => (
  <TwicImg src="image.jpg" style={styles.customImage} mode="cover" placeholder="preview"/>
);

const styles = StyleSheet.create({
  "customImage": {
    // some styles
  },
});

export default MyComponent;
```
### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and optimizing the _Cumulative Layout Shift_ metric.
When using `ratio="none"` your style **must** specify the image height.

```jsx
// MyComponent.jsx

import { TwicImg } from "@twicpics/components/react-native";

const MyComponent = () => (
  <TwicImg 
    src="path/to/your/image" 
    ratio="none"
    style={styles.heroImage} 
  />
);

// When using `ratio="none"`, you are responsible for properly sizing the component
const styles = StyleSheet.create({
  "heroImage": {
    "height": 500
  },
});

export default MyComponent;
```

<!-- #include "src/_documentation/common/react/_lifeCycle.md" -->

## Components Props


```html
<TwicImg
  src="<path>"
  alt="<String>"
  anchor="<String>"
  focus="<auto|coordinates>"
  mode="<contain|cover>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"
  step="<integer>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<Function>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | based on `src` |
| `anchor` | Positions the image in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left` and `bottom-right`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied __after__ an eventual `preTransform`. | `String` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String` | `1` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/script-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `style` | Accepts styles defined in a JavaScript object in the usual React Native style, see [React Native docs](https://reactnative.dev/docs/style). | `Object` | `null` |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | React Native [Easing](https://reactnative.dev/docs/easing) function applied to the transition effect. | `Function` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

## Examples

You can find usage examples [in our online demo project](https://twicpics-react-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic) (examples are in React, but most apply to React Native as well!)

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
[npm-image]: https://img.shields.io/badge/npm-v0.17.3-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.17.3
