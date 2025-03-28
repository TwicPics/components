// /(\b)__COVER_NAME__(\b)/gm => "react-native-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "React Native"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://reactnative.dev/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "react-native"
#include "src/_documentation/common/_cover.md"

## Contents

- [Contents](#contents)
- [Overview](#overview)
  - [What is TwicPics Components?](#what-is-twicpics-components)
  - [Platform Compatibility](#platform-compatibility)
- [Installation](#installation)
  - [Installing TwicPics Components](#installing-twicpics-components)
  - [Installing Expo modules](#installing-expo-modules)
    - [For React Native Expo Go projects](#for-react-native-expo-go-projects)
    - [For React Native CLI projects](#for-react-native-cli-projects)
- [Setup](#setup)
  - [Setting up TwicPics Components in your React Native project](#setting-up-twicpics-components-in-your-react-native-project)
  - [Setup Options](#setup-options)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Image Caching](#image-caching)
  - [Lazy Loading](#lazy-loading)
  - [Refit example](#refit-example)
  - [Working with ratio="none"](#working-with-rationone)
- [Components Props](#components-props)
  - [`TwicImg`](#twicimg)
  - [`TwicVideo`](#twicvideo)
- [Examples](#examples)
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

### What is TwicPics Components?

TwicPics Components is a __collection of components__ that make it dead easy to unleash the power of [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) in your own projects with optimized _Cumulative Layout Shift_ (CLS), low-quality image placeholders, and lazy loading out of the box.

`<TwicImg>` is a drop-in replacement for `<Image>` component.

```html
<!-- Before -->
<Image source={{uri: "https://assets.twicpics.com/examples/football.jpg"}} style={{width: 400, height: 400}}/>

<!-- After -->
<TwicImg src="football.jpg" />
```

`<TwicVideo>` is a component for seamless playback of [videos optimized with TwicPics](https://www.twicpics.com/docs/guides/video-optimization).

```html
<TwicVideo src="path/to/your/video"/>
```

### Platform Compatibility

| Android | iOS | Web |
| :-: | :-: | :-: |
| [x] | [x] | [x] |

## Installation

### Installing TwicPics Components

Add the `@twicpics/components` package to your React Native project:

```bash
# Using yarn
yarn add @twicpics/components

# Or using npm
npm install @twicpics/components
```

If you plan to use **image caching** or `TwicVideo`, you will also need to install additional [Expo Modules](#installing-expo-modules). If not, proceed directly to [setup](#setup) section.

### Installing Expo modules

The installation process for additional **Expo modules** depends on your project's origin, whether [Expo Go](https://reactnative.dev/docs/environment-setup?guide=quickstart&package-manager=yarn) or [React Native CLI](https://reactnative.dev/docs/environment-setup?guide=native&package-manager=yarn).

#### For React Native Expo Go projects

Since `Expo` is already installed, add the required dependencies as follows, depending on your needs:

```bash
# Expo AV installation (required for TwicVideo component)

## Using yarn
yarn add expo-av

## Or using npm
npm install expo-av
```

```bash
# Expo Image installation (required for image caching)

## Using yarn
yarn add expo-image

## Or using npm
npm install expo-image
```

Once completed, proceed to [setup](#setup) section.

#### For React Native CLI projects

First, install and configure the `Expo` package.

```bash
npx install-expo-modules@latest
```

**Note:** If the command fails, please refer to [Expo Modules documentation](https://docs.expo.dev/bare/installing-expo-modules/).

After `Expo` package is installed and configured, add the required dependencies as follows, depending on your needs:

```bash
# Expo AV installation (required for TwicVideo component)

## Using yarn
yarn add expo-av

## Or using npm
npm install expo-av
```

```bash
# Expo Image installation (required for image caching)

## Using yarn
yarn add expo-image

## Or using npm
npm install expo-image
```

For **iOS** targeting, reinstall the project's `CocoaPods`: 

```bash
npx pod-install
```

## Setup

### Setting up TwicPics Components in your React Native project

#include "src/_documentation/common/_requirement.md"

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
| `anticipation` | [TwicPics](https://www.twicpics.com/) will lazy-load images by default. To avoid a too abrupt transition with elements appearing into view and then images very obviously loading afterwards, [TwicPics](https://www.twicpics.com/) will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting. | `Number` | `0.2` |
| `cachePolicy` | Determines whether to cache images and where: no caching, on disk, in memory or both. Possible values are respectively `none`, `disk`, `memory` or `memory-disk`. When using a value different from `none`, you need to add [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) as a dependency to your project (see [Installing Expo Modules](#installing-expo-modules)).| `String` | `none` |
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/docs/getting-started/why-twicpics#domains-and-paths). Providing it is __mandatory__. | `String` | |
| `env` | Can be `debug`, `offline` or `production`. When set to `debug`, a gray lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of all medias targeted by their `src` value. When set to `offline`, these medias are replaced by a simple placeholder that allows to visualise their display area. | `String` | `"production"` |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | Path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
| `step` | To avoid requesting too may variants of the same image, [TwicPics](https://www.twicpics.com/) will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

## Usage

### Basic usage

```jsx
// MyComponent.jsx

import { TwicImg, TwicVideo } from '@twicpics/components/react-native'

const MyComponent = () => (
  <TwicImg
    src="path/to/your/image"
    style={styles.customImage}
    mode="cover"
    placeholder="preview"
  />
  <TwicVideo
    src="path/to/your/video"
    style={styles.customVideo}
    mode="cover"
    placeholder="preview"
  />
);

const styles = StyleSheet.create({
  "customImage": {
    // some styles
  },
  "customVideo": {
    // some styles
  },
})

export default MyComponent;
```

### Image Caching

By default, the `<TwicImg>` component only manages image caching for **web platform**.

If you plan to use image caching for **iOS** or **Android** platforms, you'll need to install [Expo Image](#installing-expo-modules) as a dependency of your project and configure the cache policy as follows:

```js
// App.js

import { installTwicpics } from '@twicpics/components/react-native';

// defines the cache policy for the entire application during setup
installTwicpics({
  "domain": `https://<your-domain>.twic.pics/`,
  "cachePolicy": `disk`, // set the cache policy to 'disk' for persistent storage
});
```

```jsx
// MyComponent.jsx

import { TwicImg } from "@twicpics/components/react-native";

const MyComponent = () => (
  <View>
    <TwicImg 
      src="path/to/your/image" {/* image will be cached to disk as defined in setup options */}
    />
    <TwicImg
      src="path/to/your/image"
      cachePolicy="memory" {/* overrides setup option with `memory` value for in-memory caching  */}
    />
    <TwicImg
      src="path/to/your/image"
      cachePolicy="none" {/* overrides setup option with `none` value: image will not be cached */}
    />
  </View>
);
```

For more information about the possible `cachePolicy` values, please refer to the [Expo Image documentation](https://docs.expo.dev/versions/latest/sdk/image/#cachepolicy).

### Lazy Loading

`TwicImg` and `TwicVideo` will lazy-load assets by default and "anticipate" lazy loading by a factor of the actual viewport. This can be controlled using the [anticipation option](#setup-options).

When embedding `TwicImg` or `TwicVideo` in a lazily loading-compatible Component like [FlatList](https://reactnative.dev/docs/flatlist), it is recommended to disable `TwicImg` or `TwicVideo`'s lazy-loading feature using the `eager` prop:

```jsx
// MyComponent.jsx

import React from 'react';
import { FlatList, View } from 'react-native';

const data = [
  // Data containing image URLs
  { id: 1, imageUrl: 'image1.jpg' },
  { id: 2, imageUrl: 'image2.jpg' },
  // More data...
];

const renderItem = ({ item }) => (
  <View>
    <TwicImg
      src={item.imageUrl}
      eager {/* disables lazy loading for this image */} />
  </View>
);

const MyComponent = () => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      // Other FlatList props...
    />
  );
};

export default MyComponent;
```

### Refit example

The `<TwicImg>` component allows to __reframe__ your image on the __main subject(s)__ it contains.

To activate automatic cropping, simply add the `refit` property to your component.

By default, the subject will be placed at the center of the resulting image but it is possible to align the subject with a given border by specifying an `anchor`.

Also by default, the subject will touch the borders of the resulting image. This can be avoided by setting `refit` with a comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) defining padding.

For example:

```html
  <!-- default refit: centered object(s), no padding around -->
  <TwicImg src="image1.jpg" refit />

  <!-- a 5% padding will be applied around main subject(s) -->
  <TwicImg src="image2.jpg" refit="5p" />

  <!-- a 5% padding will be applied vertically, a 10% padding will be applied horizontally -->
  <TwicImg src="image3.jpg" refit="5p,10p" />

  <!-- main subject(s) will be left aligned -->
  <TwicImg src="image3.jpg" anchor="left" />
```

### Working with ratio="none"

It is particularly useful when creating a "hero" banner. You can specify the height of your image while respecting its natural aspect ratio, and optimizing your _Cumulative Layout Shift_ (CLS) metric.

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

### `TwicImg`

This component can be used in instead of an `<Image>` component.

```html
<TwicImg
  src="<path>"
  alt="<String>"
  anchor="<String>"
  cachePolicy="<none|disk|memory|memory-disk>"
  crossOrigin="<anonymous|use-credentials>"
  eager="<boolean>"
  focus="<auto|coordinates>"
  mode="<contain|cover>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"
  referrerPolicy="<no-referrer|no-referrer-when-downgrade|origin|`origin-when-cross-origin|same-origin|strict-origin|strict-origin-when-cross-origin|unsafe-url>"
  refit="<boolean|String>"
  step="<integer>"
  style="<Object>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<Function>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | based on `src` |
| `anchor` | Positions the image in both `contain` and `cover` mode. Accepted values are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left` and `bottom-right`. `position` and `focus` take precedence in `contain` and `cover` mode respectively. Please note that `anchor` is applied __after__ an eventual `preTransform`. When using `refit` in `cover` mode, `anchor` aligns the main object(s) with the given border side. | `String` |
| `cachePolicy` | Overrides the [global cache policy configuration](setting-up-twicpics-components-in-your-react-native-project) and determines whether to cache the image and where: no caching, on disk, in memory or both. Possible values are respectively `none`, `disk`, `memory` or `memory-disk`. When using a value different from `none`, you need to add [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) as a dependency to your project (see [Installing Expo Modules](#installing-expo-modules)). | `String` | `none` |
`crossOrigin` | Specifies the [`CORS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) setting for the image fetch request. See [`crossOrigin property`](https://reactnative.dev/docs/image#crossorigin). | `String` | |
| `eager` | Load the image as soon as the component is mounted. This effectively means disabling lazy loading for this image. | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. You are responsible for properly sizing the component when `ratio="none"`. | `String` | `1` |
| `refit` | Reframes the image to maximize the area occupied by the main object(s) while respecting `ratio` in `cover` mode. Crops the image as close as possible to the main object(s) in `contain` mode. Can be `true`, `false` or a list of comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) defining padding. See the [TwicPics refit documentation](https://www.twicpics.com/docs/reference/transformations#refit) for more information.| `boolean or String ` | `false` |
`referrerPolicy` | Specifies the [referrer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) to use when fetching the image. See the [`image referrerpolicy property`](https://reactnative.dev/docs/image#referrerpolicy). | `String` | |
| `src` | Path to the image. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `style` | Accepts styles defined in a JavaScript object in the usual React Native style, see [React Native docs](https://reactnative.dev/docs/style). | `Object` | `null` |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | React Native [Easing](https://reactnative.dev/docs/easing) function applied to the transition effect. | `Function` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

### `TwicVideo`

```html
<TwicVideo
  src="<path>"
  anchor="<String>"
  duration="<String|number>"
  eager="<boolean>"
  from="<String|number>"
  focus="<coordinates>"
  mode="<contain|cover>"
  posterFrom="<String|number>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"
  step="<integer>"
  style="<Object>"
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
| `duration` | Limits the duration of the video. `duration` is expressed in seconds and must be a positive number. `duration` will not move the starting point of the video: to do so, you'll have to use the `from` property. See [duration documentation](https://www.twicpics.com/docs/reference/transformations#duration). | `String or number` | |
| `eager` | Load the video as soon as the component is mounted. This effectively means disabling lazy loading for this video.  | `boolean` | `false` |
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `from` | Moves the starting point of the video. `from` is expressed in seconds and must be a positive number. `from` will not move the end point of the video: to do so, you'll have to use the `duration` or `to` properties. See from documentation. See [from documentation](https://www.twicpics.com/docs/reference/transformations#from). | `String or number` | |
| `mode` | Can be `contain` or `cover` and determines if the video fills the area and is cropped accordingly (`cover`) or if the video will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/reference/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` | 
| `posterFrom` | Determines which frame of the source video should be used as a poster / preview. `posterFrom` is expressed in seconds and must be a positive number. By default `posterFrom` is equal to 0, meaning the very first frame of the video is used. `posterFrom` will not modify the video in any way: to do so, you'll have to use the `duration`, `from` or `to` properties. | `String or number` | |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/reference/transformations) to be performed before resizing the video (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/reference/transformations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. You are responsible for properly sizing the component when `ratio="none"`. | `String or number` | `1` |
| `src` | Path to the video. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/reference/native-attributes#data-twic-step) for more information. | `Integer` | `10` |
| `style` | Accepts styles defined in a JavaScript object in the usual React Native style, see [React Native docs](https://reactnative.dev/docs/style). | `Object` | `null` |
| `to` | Moves the end point of the video. `to` is expressed in seconds and must be a positive number. `to` will not move the starting point of the video: to do so, you'll have to use the `from` property. See [to documentation](https://www.twicpics.com/docs/reference/transformations#to). | `String or number` | |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | React Native [Easing](https://reactnative.dev/docs/easing) function applied to the transition effect. | `Function` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

## Examples

You can find usage examples [in our online demo project](https://twicpics-react-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic) (examples are in React, but most apply to React Native as well!)

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_license.md"
