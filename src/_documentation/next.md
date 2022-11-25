// /(\b)__COVER_NAME__(\b)/gm => "nextjs-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Next.js"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://nextjs.org/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "next"
#include "src/_documentation/common/react/_replacerRules.md"

#include "src/_documentation/common/_cover.md"

#include "src/_documentation/common/_tableOfContents.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-next-basic-example-xe9spg?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Next - Basic Example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

[Discover our demonstrations and integration examples on Codesandbox.](https://twicpics-next-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic)

#include "src/_documentation/common/_installation.md"

## Setup

If you only want to use the <strong>Next.js loader</strong>, skip to the [Usage section](#nextjs-image-loader).

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Next.js` project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```js
// import TwicPics react components (next.js uses react components)
import { installTwicpics } from "@twicpics/components/react";
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

into the app startup of your `Next.js` project.

#### _app.js

```js
// here is an example of a `Next.js` app startup configured with TwicPics.

// TwicPics Components importation
import { installTwicpics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

// TwicPics Components configuration (see Setup Options)
installTwicpics( {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

__WARNING__: editing the file containing the call to the `installTwicpics` method in watch mode (*ie* `npm|yarn next dev` ) will lead to the __warning__ message `install function called multiple times` on the browser console.  
You will need to __manually reload__ the page in your browser for any changes made to the TwicPics module configuration to take effect client-side.  
This only concerns the file containing the call to the `installTwicpics` method and is only happens if and when the TwicPics configuration is modified.

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

Import TwicPics Components `TwicImg` and `TwicVideo` in your template files and use them in place of `img` or `video` tags.

Add the import part
```js
// this component will be used in place of an img element.
// nb : next.js uses react components
import { TwicImg } from "@twicpics/components/react";

// this component will be used in place of an video element.
// nb : next.js uses react components
import { TwicVideo } from "@twicpics/components/react";
```

then, use `<TwicImg>` or `<TwicVideo>` in place of standard tags `<img>` or `<video>` (see [Components Properties](#components)).

<div id='basic-usage'/>

### Basic usage

NB : TwicPics Components can be used as well in `js`, `jsx`, `ts`, `tsx` files.

```js
// component.js
import React from "react";
import { TwicImg } from "@twicpics/components/react";

const YourTemplate = () => (
  <TwicImg src="path/to/your/image"/>
);

export default YourTemplate;
```

#include "src/_documentation/common/_bulkLoading.md"

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`styles.css`

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
// component.jsx
<div className="landscape">
  <TwicImg src=path/to/your/image></TwicImg>
</div>
<div className="square">
  <TwicImg src=path/to/your/image></TwicImg>
</div>
<div className="portrait">
  <TwicImg src=path/to/your/image></TwicImg>
</div>
<div className="contain left">
  <TwicImg src=path/to/your/image ratio="16/9"></TwicImg>
</div>
<div className="contain right">
  <TwicImg src=path/to/your/image ratio="16/9"></TwicImg>
</div>
<!---
    Attributes take precedence over CSS.
    In the next example, ratio will 16/9 AND NOT 1 as defined in square css class 
--->
<div className="cover square">
  <TwicImg src=path/to/your/image ratio="16/9"></TwicImg>
</div>
```

<a href="https://codesandbox.io/s/twicpics-x-next-style-driven-oe5bzn?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Next - Style driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

`styles.css`

```css
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

Your template features a single component that will follow your CSS directives and behave responsively.

```jsx
// component.js
<TwicImg
  className="style-driven"
  src="path/to/your/image"
></TwicImg>
```

<a href="https://codesandbox.io/s/twicpics-x-next-art-direction-ps2zj?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Next - Art direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and maintaining an optimised `CLS`.

`styles.css`

You are responsible for properly sizing the component.

```css
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
// component.jsx
<TwicImg
  src="path/to/your/image"
  className="hero-image"
  ratio="none"
></TwicImg>
```

<a href="https://codesandbox.io/s/twicpics-x-next-hero-image-sw9zj7?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x React - Hero Image" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/react/_lifeCycle.md"

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/react/_stateType.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

### Next.js Image Loader

If it does not exist, create an `.env` file at the root of your project. 

Set the `NEXT_PUBLIC_TWICPICS_DOMAIN` environment variable to your own [Twicpics domain](https://www.twicpics.com/docs/getting-started/fundamentals#domains-and-paths):


```bash
NEXT_PUBLIC_TWICPICS_DOMAIN="https://<your-domain>.twic.pics/"
```

#### Basic usage

The example below shows how to use the TwicPics loader:

```jsx
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

#### Using Placeholders

> This is only supported from Next.js 13.

The **next/image** component allows to implement [low quality image placeholders](https://www.twicpics.com/docs/topics/image-best-practices#lqip--blurry-image-placeholder) by setting the `placeholder` prop to `blur`.

When doing so, we need to set the `blurDataURL` prop. This prop expects the URL of a Base64-encoded image. TwicPics provides a `twicpicsPlaceholder` helper that returns such URL.

```jsx
import Image from 'next/image'
import { twicpicsLoader, twicpicsPlaceholder } from "@twicpics/components/next";

// In this example, we're generating the placeholder URL on server-side
export async function getServerSideProps( ) {
  const datas = {
    "src": `image.jpg`,
  };
  datas.blurDataURL = await twicpicsPlaceholder( `image:football.jpg` );
  return {
    "props": {
      datas,
    },
  };
}

const MyImage = ( { datas } ) => {
  return (
    <Image
      loader={twicpicsLoader}
      src={datas.src}
      placeholder="blur"
      blurDataURL={datas.blurDataURL}
      alt="Image alt description"
    />
  )
}
```

## Examples

You can find usage examples [in our online demo project](https://twicpics-next-demo.netlify.app//?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"