// /(\b)__COVER_NAME__(\b)/gm => "webcomponents-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Web Components"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://www.webcomponents.org/introduction"
// /(\b)__INTERCOM_TERM__(\b)/gm => "webComponents"
// /<TwicImg/g => "<twic-img"
// /`TwicImg`/g => "`twic-img`"
// /<TwicVideo/g => "<twic-video"
// /`TwicVideo`/g => "`twic-video`"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

__WARNING__: every single Shadow DOM the TwicPics components are descendants of must be opened. That's the only way the TwicPics Script will be able to reach them.

<a href="https://codesandbox.io/s/web-component-basic-19j1fm?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit web-component - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```jsx
// import TwicPics webcomponents
import { installTwicPics } from "@twicpics/components/webcomponents";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and the configuration part (see [Setup Options](#setup-options))

```js
installTwicPics( {
  // domain is mandatory
  "domain": `https://<your-domain>.twic.pics`
} );
```

into the main js file of your project.

```js
// Here is an example of a main file configured with TwicPics.
import { installTwicPics, TwicImg } from "@twicpics/components/webcomponents";

installTwicPics( {
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
    installTwicPics,
    TwicImg
  } from "./node_modules/@twicpics/components/webcomponents/module.mjs";

  installTwicPics({
    "domain": `https://<your-domain>.twic.pics`
  });

  // define the custom element alias
  customElements.define(`twic-img`, TwicImg);
</script>
```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

TwicPics Web Components comes as `Custom Html Elements`. Just use them in place of `img` or `video` tags according to the custom alias you have specified.

```html
<twic-img src="path/to/your/image"/>
```

More properties [here](#components).

<div id='basic-usage'/>

### Basic usage

`<your-page>.html`

```html
<body>
    <twic-img src="path/to/your/image"/>
</body>
```

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`index.html`

```html
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

`<your-page>.html`

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
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


#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our sample project](https://github.com/twicpics/components/tree/main/samples/react).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"