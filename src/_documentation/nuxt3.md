// /(\b)__COVER_NAME__(\b)/gm => "nuxt-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Nuxt3"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://nuxtjs.org/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "nuxt"
#include "src/_documentation/common/_title.md"

## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-nuxt3-basic-example-xejvgl?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Nuxt 3 - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Nuxt3` project

TwicPics components for `Nuxt3` comes as an `Nuxt3 Module` and is configured as [such](https://v3.nuxtjs.org/guide/features/modules#modules).

#### `nuxt.config.ts`

Add `@twicpics/components/nuxt3` to the modules section

With your twicpics configuration

```ts
export default defineNuxtConfig( {
    "modules": [ 
        `@twicpics/components/nuxt3`
    ],
    "twicpics": {
        "domain": `https://<your-domain>.twic.pics`,
    },
} );
```

```ts
// here is an example of a `nuxt.config.ts` configured with TwicPics.
import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig( {
    "modules":[
        `@twicpics/components/nuxt3`
    ] ,
    "twicpics": {
        "domain": `https://<your-domain>.twic.pics`,
        "anticipation": 0.5,
        "step": 50,
    },
} );

```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

`TwicImg` and `TwicVideo` are available in your templates as long as you have [configured the TwicPics Nuxt3 Module](#setting-up-your-project).

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

<a href="https://codesandbox.io/s/twicpics-x-nuxt3-style-driven-ggg615?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Nuxt 3 - Style Driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
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
 
<a href="https://codesandbox.io/s/twicpics-x-nuxt3-art-direction-xqbj56?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Nuxt3 - Art Direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our sample project](https://github.com/twicpics/components/tree/main/samples/nuxt3).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"