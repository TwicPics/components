// /(\b)__COVER_NAME__(\b)/gm => "angular-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Angular"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://angular.io/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "angular"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-angular-basic-6jldk?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Angular - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

TwicPics Components are available in Angular __version 11 to 13__.

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Angular` project

TwicPics components for `Angular` comes as an `Angular Module` and is configured as [such](https://angular.io/guide/architecture-modules).

<div id='module-declaration'/>

#### Module declaration in `app.module.ts`

You need to import the TwicPicsComponentsModule within your `app.module.ts` file.

__WARNING__: while importing angular components or module, you will have to select the targeted version.

eg : 
```ts
// imports TwicPicsComponentsModule
import { TwicPicsComponentsModule } from "@twicpics/components/angular11"
``` 

Add the import part

```ts
// import TwicPics Angular Module
import { TwicPicsComponentsModule } from "@twicpics/components/angular<your-targeted-version>"
```

and the usage declaration of the module

```ts
@NgModule( {
  "imports": [
    TwicPicsComponentsModule,
  ],
} )
```

```ts
// here is an example of a `app.module.ts` configured with TwicPics.
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TwicPicsComponentsModule } from "@twicpics/components/angular13";

@NgModule( {
  "declarations": [ AppComponent ],
  "imports": [
    BrowserModule,
    TwicPicsComponentsModule,
  ],
  "providers": [],
  "bootstrap": [ AppComponent ],
} )
export class AppModule { }
```

#### TwicPics Components Configuration in `app.component.ts`

The configuration part (see [Setup Options](#setup-options)) is done in `app.component.ts`.

__WARNING__: here again, you will have to select the targeted version while importing angular components. 

```ts
//here is an example of a `Angular` app.component.ts configured with TwicPics.
import { Component } from "@angular/core";
import { installTwicPics } from "@twicpics/components/angular13";
@Component( {
  "selector": "app-root",
  "templateUrl": "./app.component.html",
} )
export class AppComponent {
}

// TwicPics Components configuration (see Setup Options)
installTwicPics( {
  "domain": "https://<your-domain>.twic.pics",
  "anticipation": 0.5,
  "step": 100,
} );
```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

`TwicImg` and `TwicVideo` are available for use in the scope of the module into which you have imported `TwicPicsComponentsModule` [see Module Declaration](#module-declaration).

Just use them in your template files in place of `img` or `video` tags.

`<your-component-within-app.module>.component.html`

```html
<TwicImg src="path/to/your/image"></TwicImg>
```

<div id='basic-usage'/>

### Basic usage

`<your-component-within-app.module>.component.html`

```html
<main>
  <TwicImg src="path/to/your/image"/>
</main>
```

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`<your-component-within-app.module>.component.css`

```CSS
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

`<your-component-within-app.module>.component.html`

```html
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
  <div class="contain left">
    <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
  </div>
  <div class="contain right">
    <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
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
  <!---
  Attributes take precedence over CSS.
  In the next example, ratio will 16/9 AND NOT 1 as defined in square css class 
  --->
  <div className="cover square">
    <TwicImg src="path/to/your/image" ratio="16/9"></TwicImg>
  </div>
</main>
```

<a href="https://codesandbox.io/s/twicpics-x-angular-style-driven-fwp59j?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Angular - Style Driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

`<your-component-within-app.module>.component.css`

```css
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

```

`<your-component-within-app.module>.component.html`

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
<main>
  <div class="style-driven-responsive">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

<a href="https://codesandbox.io/s/twicpics-x-angular-art-direction-h4xb4j?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Angular - Art direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our sample project](https://github.com/twicpics/components/tree/main/samples/angular13).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"