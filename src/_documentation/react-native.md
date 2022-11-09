// /(\b)__COVER_NAME__(\b)/gm => "react-native-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "React Native"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://reactnative.dev/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "react-native"
#include "src/_documentation/common/react/_replacerRules.md"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

#include "src/_documentation/common/_installation.md"

## Setup

### Install TwicPics in your React Native project

Note that while we recommend using ES module imports, TwicPics Components is backward compatible with CommonJS and `require` statements.

```js
// App.js

import { installTwicPics } from '@twicpics/components/react-native';

installTwicPics({
  "domain": `https://<your-domain>.twic.pics/`,
});

export default function App() {
  return (
    // your app code
  )
}
```

For an exhaustive list of options, see [Setup Options](#setup-options).

#include "src/_documentation/common/_setupOptions.md"

## Usage

> Note: `<TwicVideo>` is not supported yet for React Native.

### Basic usage

```jsx
// MyComponent.jsx

import { TwicImg } from "@twicpics/components/react-native";

const MyComponent = () => (
  <TwicImg src="cat_1x1.jpg" style={styles.customImage} mode="cover" placeholder="preview"/>
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

```jsx
// MyComponent.jsx

import { TwicImg } from "@twicpics/components/react-native";

const MyComponent = () => (
  <TwicImg 
    src="cat_1x1.jpg" 
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
  eager="<boolean>"
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
| `focus` | Sets the focus point in `cover` mode. `focus` takes precedence over `anchor` when both are provided. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-focus) for more information. Only use this attribute if you need a specific focus point or if you want to leverage smart cropping with `focus="auto"`: if you only need border-based positionning (`top`, `bottom`, `left`, `right`, etc), use `anchor` instead. | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/api/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/api/manipulations)). Note that `anchor` and `focus` are applied __after__ `preTransform`: if you need to specify a specific focus point for your `preTransform` then it needs to be part of the expression (like `preTransform="focus=auto/crop=50px50p"` for instance). Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` or `width:height` value pair (as in `4/3` or `4:3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser following your `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String` | `1` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/api/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |__TWIC_STATE_CHANGE_IMG__
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `style` | Accepts styles defined in a JavaScript object in the usual React Native style, see [React Native docs](https://reactnative.dev/docs/style). | `Object` | `null` |
| `transition` | Determines how the image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | React Native [Easing](https://reactnative.dev/docs/easing) function applied to the transition effect. | `Function` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

## Examples

You can find usage examples [in our online demo project](https://twicpics-react-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic) (examples are in React, but most apply to React Native as well!)

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"  position="<css position>"