// /(\b)__COVER_NAME__(\b)/gm => "vuejs-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Vue3"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://vuejs.org/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "vue"
#include "src/_documentation/common/vue/_replacerRules.md"
#include "src/_documentation/common/_cover.md"

#include "src/_documentation/common/_tableOfContents.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

> [!NOTE]
> Discover our demonstrations and integration examples [in our online demo project](https://twicpics-vue3-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_installation.md"

## Setup

#include "src/_documentation/common/_requirement.md"

### Setting up TwicPics Components in your `Vue3` project

TwicPics components for `Vue3` come as a `Vue3 Plugin` and are configured as [such](https://vuejs.org/guide/reusability/plugins.html).

Add the import part:

```js
// import TwicPics vue3 plugin
import TwicPics from "@twicpics/components/vue3";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and use TwicPics Components Plugin with [Setup Options](#setup-options)

```js
// app is the application instance 
app.use(TwicPics, {
  domain: "https://<your-domain>.twic.pics"
});
```

into the app startup of your `Vue3` project.

#### main.js

```js
// Here is an example of a `Vue3` app startup configured with TwicPics.
import App from "./App.vue";
import { createApp } from "vue";

// import TwicPics Vue3 Plugin
import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";

// create application instance
const app = createApp(App);

// configure TwicPics Vue3 Plugin
app.use(TwicPics, {
  domain: "https://<your-domain>.twic.pics"
});

app.mount("#app");
```

__Changing components names__

You can change how components are named using the `TwicImg` and/or `TwicVideo` options when calling `use`:

```js
app.use( TwicPics, {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics",
  "TwicImg": "Batman"
} );
```

You can then reference the component using the alternate name:

```html
<template>
  <Batman src="path/to/your/image"/>
</template>
```

#include "src/_documentation/common/_setupOptions.md"

#include "src/_documentation/common/_usage.md"

```html
<template>
  <main>
    <TwicImg src="path/to/your/image"/>
  </main>
</template>
```

### Basic usage

```html
<!-- component.vue -->
<template>
  <main>
    <TwicImg src="path/to/your/image"/>
  </main>
</template>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src%2Fviews%2FTwicBasicGrid.vue&initialpath=basic-grid)

#include "src/_documentation/common/_bulkLoading.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src%2Fviews%2FTwicBulkLoading.vue&initialpath=bulk-loading)

#include "src/_documentation/common/_criticalImages.md"

#include "src/_documentation/common/_zoomFeature.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src%2Fviews%2FTwicZoom.vue&initialpath=zoom)

#include "src/_documentation/common/vue/_lifeCycle.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src%2Fviews%2FTwicState.vue&initialpath=state)

#include "src/_documentation/common/_refitFeature.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src%2Fviews%2FTwiRefit.vue&initialpath=refit)

#include "src/_documentation/common/_styleDrivenApproach.md"


```html
<!-- component.vue -->
<template>
  <main>
    <div class="twic-item landscape">
      <TwicImg src="path/to/your/image"></TwicImg>
    </div>
    <div class="twic-item square">
      <TwicImg src="path/to/your/image"></TwicImg>
    </div>
    <div class="twic-item portrait">
      <TwicImg src="path/to/your/image"></TwicImg>
    </div>
    <div class="twic-item contain left">
      <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
    </div>
    <div class="twic-item contain right">
      <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
    </div>
    <div class="twic-item lg">
      <TwicImg src="path/to/your/image"></TwicImg>
    </div>
    <div class="twic-item md">
      <TwicImg src="path/to/your/image"></TwicImg>
    </div>
    <div class="twic-item sm">
      <TwicImg src="path/to/your/image"></TwicImg>
    </div>
    <!---
    Attributes take precedence over CSS.
    In the next example, ratio will 16/9 AND NOT 1 as defined in square css class 
--->
    <div class="cover square">
      <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
};
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
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src/views/TwicStyleDriven.vue&initialpath=style-driven)


#include "src/_documentation/common/_responsiveExample.md"

```html
<!-- component.vue -->
<template>
  <main>
    <div class="style-driven-responsive">
      <TwicImg src="path/to/your/image"></TwicImg>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
};
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
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src/views/TwicArtDirections.vue&initialpath=art-directions)

#include "src/_documentation/common/_workingWithRatioNone.md"

```html
<!-- component.vue -->
<template>
  <TwicImg
    src="path/to/your/image"
    class="hero-image"
    ratio="none"
 ></TwicImg>
</template>

<script>
export default {
  name: "App",
};
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
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-vue3?file=src%2Fviews%2FTwicHero.vue&initialpath=hero)

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/vue/_stateType.md"

#include "src/_documentation/common/_cssVariables.md"

#include "src/_documentation/common/_breakpoints.md"

## Examples

You can find usage examples [in our sample project](https://twicpics-vue3-demo.netlify.app/).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_license.md"
