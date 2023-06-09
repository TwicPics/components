// /(\b)__COVER_NAME__(\b)/gm => "nextjs-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Next.js"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://nextjs.org/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "next"
// /(\b)setup-options(\b)/gm => "twic-install"
// /(\b)Setup Options(\b)/gm => "TwicInstall"
#include "src/_documentation/common/react/_replacerRules.md"

#include "src/_documentation/common/_cover.md"

#include "src/_documentation/common/_tableOfContents.md"

## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

Discover our demonstrations and integration examples [in our online demo project](https://twicpics-next-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_installation.md"

## Setup

If you only want to use the **Next.js loader**, skip to [Next.js Image Loader](#nextjs-image-loader).

### Install TwicPics In Your Next.js Project

#include "src/_documentation/common/_requirement.md"

Configuration of `TwicPics Components` depends on the setup of your application, whether you are using [Next Pages Router](#page-router) or [Next App Router](#app-router).

<div id='page-router'/>

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

<div id='app-router'/>

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

<div id='twic-install'/>

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
| `anticipation` | [TwicPics](https://www.twicpics.com/) will lazy-load images by default. To avoid too abrupt a transition with elements appearing into view and then images very obviously loading afterwards, [TwicPics](https://www.twicpics.com/) will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting. | `Number` | `0.2` |
| `domain` | This is your very own [TwicPics domain](https://www.twicpics.com/docs/getting-started/fundamentals#domains-and-paths). Providing it is __mandatory__. | `String` | |
| `env` | Can be `debug`, `offline` or `production`. When set to `debug`, a gray lightweight `svg` [placeholder](https://www.twicpics.com/docs/reference/placeholders) that displays its intrinsic dimensions is displayed in place of all medias targeted by their `src` value. When set to `offline`, these medias are replaced by a simple placeholder that allows to visualise their display area. | `String` | `"production"` |
| `handleShadowDom` | Must be set to `true` when using TwicComponents within a shadow DOM. | `boolean` | `false` |
| `maxDPR` | [TwicPics](https://www.twicpics.com/) will take the "Device Pixel Ratio" (`DPR`) of the current device into consideration when determining the sizes of images to load. By default, it will not take a `DPR` greater than `2` into consideration. If the `DPR` of the device is higher than `2`, [TwicPics](https://www.twicpics.com/) will assume it to be `2`. Using `maxDPR`, you can lower this limit down to `1` or be more permissive (for instance by setting it to `3` or `4`). | `Number` | `2` |
| `path` | Path to prepend to all src attributes. For instance, if path is `"some/folder"` then a src attribute set to `"image.jpg"` will be expanded into `"some/folder/image.jpg"` | `String` | |
| `step` | To avoid requesting too may variants of the same image, [TwicPics](https://www.twicpics.com/) will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio. | `Integer` | `10` |

<div id='usage'/>

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

#include "src/_documentation/common/_bulkLoading.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages/bulk-loading/index.jsx&initialpath=bulk-loading)

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages/style-driven/index.jsx&initialpath=style-driven)

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Fart-directions%2Findex.jsx&initialpath=art-directions)

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Fhero%2Findex.jsx&initialpath=hero)

#include "src/_documentation/common/react/_lifeCycle.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%2Fstate%2Findex.jsx&initialpath=state)

#include "src/_documentation/common/_zoomFeature.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-next?file=pages%zoom%2Findex.jsx&initialpath=zoom)

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/react/_stateType.md"

#include "src/_documentation/common/_cssVariables.md"

## Next.js Image Loader

**Note:** You will need a TwicPics domain to initialize the package. [Create an account for free](https://account.twicpics.com/signup) to get your domain.


If it does not exist, create a `.env` file at the root of your project. 

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

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-next-demo.netlify.app?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"
