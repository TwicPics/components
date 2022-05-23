// /(\b)__COVER_NAME__(\b)/gm => "gatsby-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Gatsby"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://www.gatsbyjs.com/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "gatsby"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-gatsby-basic-example-64cid1?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Gatsby - Basic Example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


[Discover our demonstrations and integration examples on Codesandbox.](https://twicpics-gatsby-demo.netlify.app/?utm_source=sendinblue&utm_campaign=github&utm_medium=github)

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Gatsby` project

TwicPics components for `Gatsby` comes as an `Gatsby Plugin` and is configured as [such](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/using-a-plugin-in-your-site/).

#### `gatsby-config.js`

Add `@twicpics/components/gatsby` to the plugins section with your twicpics configuration as plugin options : 

```json
{
  "resolve": "@twicpics/components/gatsby",
  "options": {
    "twicpics": {
      "domain": "https://<your-domain>.twic.pics",
    },
  },
}
```

```js
// here is an example of a `gatsby-config.js` configured with TwicPics.
module.exports = {
  "siteMetadata": {
    "title": "twicpics x gatsby",
    "siteUrl": "https://www.yourdomain.tld",
  },
  "plugins": [
      {
        "resolve": "@twicpics/components/gatsby",
        "options": {
          "twicpics": {
            "domain": "https://<your-domain>.twic.pics"
          },
        },
      },
  ],
};
```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

Import TwicPics Components `TwicImg` and `TwicVideo` in your template files and use them in place of `img` or `video` tags.

Add the import part
```js
// this component will be used in place of an img element.
// nb : Gatsby uses react components
import { TwicImg } from "@twicpics/components/react";

// this component will be used in place of an video element.
// nb : Gatsby uses react components
import { TwicVideo } from "@twicpics/components/react";
```

then, use `<TwicImg>` or `<TwicVideo>` in place of standard tags `<img>` or `<video>` (see [Components Properties](#components)).

<div id='basic-usage'/>

### Basic usage

`<your-page-or-component>.js`

__NB__ : TwicPics Components can also be used in `js`, `jsx`, `ts`, `tsx` files.

```js
import * as React from 'react';

import { TwicImg } from "@twicpics/components/react";

const YourTemplate = () => (
  <TwicImg src="path/to/your/image"/>
);

export default YourTemplate;
```

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

`<your-page-or-component>.jsx`

```html
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

<a href="https://codesandbox.io/s/twicpics-x-gatsby-art-direction-k4n458?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Gatsby - Art Direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
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

`<your-page-or-component>.js`

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
<TwicImg
  className="style-driven"
  src="path/to/your/image"
></TwicImg>
```

<a href="https://codesandbox.io/s/twicpics-x-gatsby-style-driven-h97h50?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Gatsby - Style Driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and maintaining an optimised `CLS`.

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

`<your-page-or-component>.jsx`

```html
<TwicImg
  src="path/to/your/image"
  className="hero-image"
  ratio="none"
></TwicImg>
```

<a href="https://codesandbox.io/s/twicpics-x-gatsby-hero-image-oerdt2?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Gatsby - Hero Image" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-gatsby-demo.netlify.app/?utm_source=sendinblue&utm_campaign=github&utm_medium=github).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"