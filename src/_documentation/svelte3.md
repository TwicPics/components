// /(\b)__COVER_NAME__(\b)/gm => "svelte-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Svelte3"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://svelte.dev/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "svelte"
// /(\b)__TWIC_STATE_TABLE_CONTENT__(\b)/gm => "\n    - [Lifecycle](#lifecycle)"
// /(\b)__TWIC_STATE_CHANGE_PROP__(\b)/gm => "\n  bind:state=\"<String>\"\n  on:statechange=\"<function>\""
// /(\b)__TWIC_STATE_CHANGE_IMG__(\b)/gm => "\n| `state` | A string property being update each time the image loading state is updated. Values can be `new`, `loading`, `done` or `error`.| `String` | |\n| `statechange` | A custom event dispatched each time the image loading state is updated. Emitted values can be `new`, `loading`, `done` or `error`.| `( e: CustomEvent ) => void` | |"
// /(\b)__TWIC_STATE_CHANGE_VIDEO__(\b)/gm => "\n| `state` | A string property being update each time the video loading state is updated. Values can be `new`, `loading`, `done` or `error`.| `String` | |\n| `statechange` | A custom event dispatched each time the video loading state is updated. Emitted values can be `new`, `loading`, `done` or `error`.| `( e: CustomEvent ) => void` | |"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-svelte-basic-example-ygqef7?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Svelte - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Svelte3` project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```js
// import TwicPics svelte3 components
import { installTwicPics } from "@twicpics/components/svelte3";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and the configuration part (see [Setup Options](#setup-options))

```js
installTwicPics( {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );
```

into the app startup of your `Svelte3` project.

#### index.js

```js
// Here is an example of a `Svelte3` app startup configured with TwicPics.
import { installTwicPics } from "@twicpics/components/svelte3";
import "@twicpics/components/style.css";

import App from "./App.svelte";

installTwicPics({
  "domain": `https://<your-domain>.twic.pics`
});

const app = new App({
  target: document.body
});

export default app;
```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

Import TwicPics Components `TwicImg` and `TwicVideo` in your template files and use them in place of `img` or `video` tags.

Add the import part in the `script` section of your `.svelte` page
```html
<script>
  // this component will be used in place of an img element.
  import { TwicImg } from "@twicpics/components/svelte3";

  // this component will be used in place of an video element.
  import { TwicVideo } from "@twicpics/components/svelte3";
</script>
```

then, use `<TwicImg>` or `<TwicVideo>` in place of standard tags `<img>` or `<video>` (see [Components Properties](#components)).

<div id='basic-usage'/>

### Basic usage

```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<main>
  <TwicImg src="path/to/your/image"></TwicImg>
</main>
```

#include "src/_documentation/common/_bulkLoading.md"

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<style>
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
  <div class="lg">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="md">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="sm">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

<a href="https://codesandbox.io/s/twicpics-x-svelte-styles-driven-ww3yjn?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Svelte - Style Driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.


```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<style>
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

<main>
  <div class="style-driven-responsive">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

Your template features a single component that will follow your CSS directives and behave responsively.
 
<a href="https://codesandbox.io/s/twicpics-x-svelte-art-directions-q8xl64?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Svelte - Art direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and maintaining an optimised `CLS`.


```html
<!-- component.svelte-->
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<style>
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
</style>

<TwicImg
  src="path/to/your/image"
  className="hero-image"
  ratio="none"
></TwicImg>
```

<a href="https://codesandbox.io/s/twicpics-x-svelte-hero-image-tgzblz?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Svelte3 - Hero Image" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='lifecycle'/>

### Lifecycle

Binding to `state` props gives access to the loading state of your image or video.

Here are the values the Component will emit :

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


```html
<!-- component.svelte -->
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
  let state;

  $: {
    // Implement the logic here
    console.log( `TwicComponent emits a new state`, state );
  }
</script>


<TwicImg
  bind:state
  src="path/to/your/image"
/>
```

Another approach is to listen to `statechange` event.

```html
<!-- component.svelte -->
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
  let state;

  const handleStateChange = ( e ) => {
    // Implement the logic here
    state = e.detail;
    console.log( `TwicComponent emits a new state`, state );
  }
</script>


<TwicImg
  on:statechange={handleStateChange}
  src="path/to/your/image"
/>
```

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-svelte-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"