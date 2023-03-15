// /(\b)__COVER_NAME__(\b)/gm => "sveltekit-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "SvelteKit"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://kit.svelte.dev/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "SvelteKit"
// /(\b)__TWIC_STATE_TABLE_CONTENT__(\b)/gm => "\n    - [Lifecycle](#lifecycle)"
// /(\b)__TWIC_STATE_CHANGE_PROP__(\b)/gm => "\n  bind:state=\"<String>\"\n  on:statechange=\"<function>\""
// /(\b)__TWIC_STATE_CHANGE__(\b)/gm => "\n| `state` | A string property being update each time the asset loading state is updated. Values can be `new`, `loading`, `done` or `error`.| `String` | |\n| `statechange` | A custom event dispatched each time the image loading state is updated. Emitted values can be `new`, `loading`, `done` or `error`.| `( e: CustomEvent ) => void` | |"

#include "src/_documentation/common/_cover.md"

#include "src/_documentation/common/_tableOfContents.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

Discover our demonstrations and integration examples [in our online demo project](https://twicpics-sveltekit-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_installationDevDependencies.md"

<div id='setup'/>

## Setup

#include "src/_documentation/common/_requirement.md"

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `SvelteKit` project

Add the import part

```js
  // import TwicPics sveltekit components
  import { installTwicpics } from "@twicpics/components/sveltekit";
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

into the main [layout](https://kit.svelte.dev/docs/routing#layout-layout-svelte) of your `SvelteKit` project.

If you don't already have a [layout](https://kit.svelte.dev/docs/routing#layout-layout-svelte) that applies to all the pages of your application, simply create it by adding `+layout.svelte` file, right next to your entry point `src/routes/+page.svelte`.

#### src/routes/+layout.svelte

```html
<script>
  // Here is an example of +layout.svelte file
  import { installTwicPics } from "@twicpics/components/sveltekit";
  import "@twicpics/components/style.css";
  installTwicPics( {
      "domain": `https://<your-domain>.twic.pics`,
  } );
</script>
<slot />
```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

Import TwicPics Components `TwicImg` and `TwicVideo` in your template files and use them in place of `img` or `video` tags.

Add the import part in the `script` section of your `.svelte` file
```html
<script>
  // this component will be used in place of an img element.
  import { TwicImg } from "@twicpics/components/sveltekit";

  // this component will be used in place of an video element.
  import { TwicVideo } from "@twicpics/components/sveltekit";
</script>
```

or

```html
<script>
  // this component will be used in place of an img element.
  import TwicImg from "@twicpics/components/sveltekit/TwicImg.svelte";

  // this component will be used in place of an video element.
  import TwicVideo from "@twicpics/components/sveltekit/TwicVideo.svelte";
</script>
```

then, use `<TwicImg>` or `<TwicVideo>` in place of standard tags `<img>` or `<video>` (see [Components Properties](#components)).

<div id='basic-usage'/>

### Basic usage

```html
<!-- component.svelte-->
<script>
  import TwicImg from "@twicpics/components/sveltekit/TwicImg.svelte";
</script>

<main>
  <TwicImg src="path/to/your/image"></TwicImg>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-sveltekit?file=src%2Froutes%2Fbasic-grid%2F%2Bpage.svelte&initialpath=basic-grid)

#include "src/_documentation/common/_bulkLoading.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-sveltekit?file=src%2Froutes%2Fbulk-loading%2F%2Bpage.svelte&initialpath=bulk-loading)

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

```html
<script>
  // component.svelte
  import TwicImg from "@twicpics/components/sveltekit/TwicImg.svelte";
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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-sveltekit?file=src%2Froutes%2Fstyle-driven%2F%2Bpage.svelte&initialpath=style-driven)


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.


```html
<script>
  // component.svelte
  import TwicImg from "@twicpics/components/sveltekit/TwicImg.svelte";
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
 
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-sveltekit?file=src%2Froutes%2Fart-directions%2F%2Bpage.svelte&initialpath=art-directions)

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and optimizing your _Cumulative Layout Shift_ (CLS) metric.


```html
<script>
  // component.svelte
  import TwicImg from "@twicpics/components/sveltekit/TwicImg.svelte";
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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-sveltekit?file=src%2Froutes%2Fhero%2F%2Bpage.svelte&initialpath=hero)

<div id='lifecycle'/>

### Lifecycle

Binding to `state` props gives access to the loading state of your image or video.

Here are the values the Component will emit :

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


```html
<script>
  // component.svelte
  import TwicImg from "@twicpics/components/sveltekit/TwicImg.svelte";
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
<script>
  // component.svelte
  import TwicImg from "@twicpics/components/sveltekit/TwicImg.svelte";
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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-sveltekit?file=src%2Froutes%2Fstate%2F%2Bpage.svelte&initialpath=state)

#include "src/_documentation/common/_zoomFeature.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-sveltekit?file=src%2Froutes%2Fzoom%2F%2Bpage.svelte&initialpath=zoom)

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-svelte-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"