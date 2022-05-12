// /(\b)__COVER_NAME__(\b)/gm => "vuejs-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Vue2"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://vuejs.org/index.html"
// /(\b)__INTERCOM_TERM__(\b)/gm => "vue"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-vue2-basic-example-ym85ql?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Vue 2 - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Vue2` project

TwicPics components for `Vue2` comes as an `Vue2 Plugin` and is configured as [such](https://vuejs.org/guide/reusability/plugins.html).

Add the import part

```js
// import TwicPics vue2 plugin
import TwicPics from "@twicpics/components/vue2";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and use TwicPics Components Plugin with [Setup Options](#setup-options)

```js
Vue.use(TwicPics, {
  domain: "https://<your-domain>.twic.pics"
});
```

into the app startup of your `Vue2` project.

#### main.js

```js
// Here is an example of a `Vue2` app startup configured with TwicPics.
import Vue from "vue";
import App from "./App.vue";

// import TwicPics plugin
import TwicPics from "@twicpics/components/vue2";
import "@twicpics/components/style.css";

// configure TwicPics plugin
Vue.use(TwicPics, {
  domain: "https://<your-domain>.twic.pics"
});

new Vue({
  render: (h) => h(App)
}).$mount("#app");

```

__Changing components names__

You can change how components are named using the `TwicImg` and/or `TwicVideo` options when calling `use`:

```js
Vue.use( TwicPics, {
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

<div id='usage'/>

## Usage

`TwicImg` and `TwicVideo` are available in your templates as long as you have [configured the TwicPics Vue2 Plugin](#setting-up-your-project).

Just use them in your template files in place of `img` or `video` tags (see [Components Properties](#components)).

```html
<template>
  <main>
    <TwicImg src="path/to/your/image"/>
  </main>
</template>
```

<div id='basic-usage'/>

### Basic usage

`<your-page-or-component>.vue`

```html
<template>
  <main>
    <TwicImg src="path/to/your/image"/>
  </main>
</template>
```

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`<your-page-or-component>.vue`

```html
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

<a href="https://codesandbox.io/s/twicpics-x-vue2-style-driven-vp5c8e?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Vue 2 - Style Driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

`<your-page-or-component>.vue`

```html
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

Your template features a single component that will follow your CSS directives and behave responsively.
 
<a href="https://codesandbox.io/s/twicpics-x-vue2-art-directions-s0vks9?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Vue 2 - Art Direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='ratio-none'/>

### Working with ratio="none"

Particularly useful when creating hero banner, you can specify the height of your image while respecting its natural aspect ratio and maintaining an optimised `CLS`.

`<your-page-or-component>.vue`

```html
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

<a href="https://codesandbox.io/s/twicpics-x-vue2-hero-image-pkpqh3?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Vue2 - Hero Image" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-vue-demo.netlify.app/?utm_source=sendinblue&utm_campaign=github&utm_medium=github).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"