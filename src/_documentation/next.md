// /(\b)__COVER_NAME__(\b)/gm => "nextjs-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Next.js"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://nextjs.org/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "next"
#include "src/_documentation/common/react/_replacerRules.md"

#include "src/_documentation/common/_cover.md"

- [Overview](#about)
    - [What is TwicPics ?](#what-is-twicpics)
    - [What is TwicPics Components ?](#what-is-twicpics-components)
- [Installation](#installation)
- [Setup](#setup)
    - [Install TwicPics In Your Next.js Project](#install-twicpics-in-your-nextjs-project)
    - [Setup Options](#setup-options)
- [Usage](#usage)
    - [Basic usage](#basic-usage)
    - [Bulk loading with TwicView](#bulk-loading-with-twicview)
    - [Style Driven Approach](#style-driven-approach)
    - [Responsive Example](#responsive-example)
    - [Working with ratio="none"](#ratio-none)__TWIC_STATE_TABLE_CONTENT__
- [Components properties](#components-props)
    - [TwicImg](#twic-img)
    - [TwicVideo](#twic-video)
- [CSS variables](#css-variables)
- [Next.js Image Loader](#nextjs-image-loader)
- [Examples](#examples)
- [Questions and feedback](#getting-help)
- [Other frameworks](#other-frameworks)
- [Licence](#licence)
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-next-basic-example-xe9spg?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Next - Basic Example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

[Discover our demonstrations and integration examples on Codesandbox.](https://twicpics-next-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic)

#include "src/_documentation/common/_installation.md"

## Setup

If you only want to use the **Next.js loader**, skip to [Next.js Image Loader](#nextjs-image-loader).

### Install TwicPics In Your Next.js Project

#include "src/_documentation/common/_requirement.md"

This example uses ES module imports, but TwicPics Components is compatible with CommonJS and `require` statements.


```js
// _app.js

import { installTwicpics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

installTwicpics({
  domain: "https://<your-domain>.twic.pics"
});

export default function MyApp({ Component, pageProps }) {
  return (
    // your app code
  )
}
```

__WARNING__: Updating the configuration passed to `installTwicpics()` method in watch mode (i.e. when running `next dev`) will lead to a `install function called multiple times` warning in the browser console. You will need to manually reload the page to apply the new configuration.

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

### Basic Usage

```jsx
// MyComponent.jsx

import React from "react";
import { TwicImg } from "@twicpics/components/react";

const YourTemplate = () => (
  <TwicImg src="path/to/your/image"/>
);

export default YourTemplate;
```

#include "src/_documentation/common/_bulkLoading.md"

### Style-Driven Approach

You can style your components using pure CSS with [CSS variables](#css-variables).

**CSS**

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

**Template**

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

**Demo**

<a href="https://codesandbox.io/s/twicpics-x-next-style-driven-oe5bzn?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Next - Style driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

### Responsive Example

[CSS variables](#css-variables) also enable you to create responsive designs without hassle.

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

Now, your template can feature a single component that follows your CSS directives and behave responsively.

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

<a href="https://codesandbox.io/s/twicpics-x-next-art-direction-ps2zj?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Next - Art direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='ratio-none'/>

### Working with ratio="none"

This is particularly useful when creating hero banner. You can use it to specify an height of your image or vieo while preserving its natural aspect ratio and optimizing your _Cumulative Layout Shift_ (CLS) metric.

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

<a href="https://codesandbox.io/s/twicpics-x-next-hero-image-sw9zj7?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x React - Hero Image" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/react/_lifeCycle.md"

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/react/_stateType.md"

#include "src/_documentation/common/_cssVariables.md"

## Next.js Image Loader

If it does not exist, create an `.env` file at the root of your project. 

Set the `NEXT_PUBLIC_TWICPICS_DOMAIN` environment variable to your own [Twicpics domain](https://www.twicpics.com/docs/getting-started/fundamentals#domains-and-paths):


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

For easier aspect ratio management, consider using the `<TwicImg>` component (see [Setup](#setup)). This will also give you access to all [TwicPics features](https://www.twicpics.com/docs/reference/transformations) like smart cropping, automatic next-gen formats, and more.

### Using Placeholders

> This is only supported from Next.js 13.

The Next Image component allows to implement [low quality image placeholders](https://www.twicpics.com/docs/topics/image-best-practices#lqip--blurry-image-placeholder) by setting the `placeholder` prop to `blur`.

When doing so, we need to set the `blurDataURL` prop. This prop expects the URL of a Base64-encoded image. TwicPics provides a `twicpicsPlaceholder` helper that returns such URL.

```jsx
import Image from 'next/image'
import { twicpicsLoader, twicpicsPlaceholder } from "@twicpics/components/next";

// In this example, we're generating the placeholder URL on server-side
export async function getServerSideProps() {
  const data = {
    src: `image.jpg`,
  };
  datas.blurDataURL = await twicpicsPlaceholder('image:football.jpg');
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

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-next-demo.netlify.app//?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"