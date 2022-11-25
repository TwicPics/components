// /(\b)__COVER_NAME__(\b)/gm => "angular-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Angular"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://angular.io/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "angular"
// /(\b)__TWIC_STATE_TABLE_CONTENT__(\b)/gm => "\n    - [Lifecycle](#lifecycle)"
// /(\b)__TWIC_STATE_CHANGE_PROP__(\b)/gm => "\n  (stateChangeEvent)=\"<function>\""
// /(\b)__TWIC_STATE_CHANGE_IMG__(\b)/gm => "\n| `stateChangeEvent` | An event emitter triggered each time the image loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`EventEmitter<StateEvent>`](#state-event-type) | |"
// /(\b)__TWIC_STATE_CHANGE_VIDEO__(\b)/gm => "\n| `stateChangeEvent` | An event emitter triggered each time the video loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`EventEmitter<StateEvent>`](#state-event-type) | |"

#include "src/_documentation/common/_cover.md"

#include "src/_documentation/common/_tableOfContents.md"

## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-angular-basic-6jldk?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Angular - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

TwicPics Components are available in Angular __version 11 to 14_.

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
import { TwicPicsComponentsModule } from "@twicpics/components/angular14";

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
import { installTwicpics } from "@twicpics/components/angular14";
@Component( {
  "selector": "app-root",
  "templateUrl": "./app.component.html",
} )
export class AppComponent {
}

// TwicPics Components configuration (see Setup Options)
installTwicpics( {
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

```html
<!-- component.html -->
<TwicImg src="path/to/your/image"></TwicImg>
```

<div id='basic-usage'/>

### Basic usage

```html
<!-- component.html -->
<main>
  <TwicImg src="path/to/your/image"/>
</main>
```

#include "src/_documentation/common/_bulkLoading.md"

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`<your-component-within-app.module>.component.css`

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
<!-- component.html -->
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

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
<!-- component.html -->
<main>
  <div class="style-driven-responsive">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

<a href="https://codesandbox.io/s/twicpics-x-angular-art-direction-h4xb4j?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Angular - Art direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
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

`<your-page-or-component>.html`

```html
<TwicImg
  src="path/to/your/image"
  class="hero-image"
  ratio="none"
></TwicImg>
```

<a href="https://codesandbox.io/s/twicpics-x-angular-hero-image-r545pf?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Angular - Hero Image" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<div id='lifecycle'/>

### Lifecycle

Binding to `stateChangeEvent` gives access to the loading state of your image or video.

Here are the values the Component will emit ([see State Type definition](#state-type)) :

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


```html
<!-- component.html -->
<TwicImg
  src="path/to/your/image"
  (stateChangeEvent)="handleStateChange($event)"
></TwicImg>
```

```ts
  // component.ts
  import { ChangeDetectorRef, Component } from "@angular/core";
  import { State, StateEvent, TwicImgComponent } from "@twicpics/components/angular13";

  export class Component {

  state?: State;

  constructor(private changeDetector: ChangeDetectorRef) { }

  handleStateChange = (stateEvent: StateEvent) => {
    // Implement the logic here
    const { state, target } = stateEvent;
    const _target = target as TwicImgComponent;
    // eslint-disable-next-line no-console
    console.log( `TwicComponent emits a new state`, state );
    // eslint-disable-next-line no-console
    console.log( `TwicComponent source was`, _target.src );
    this.state = state;
    this.changeDetector.detectChanges();
  }
```

#include "src/_documentation/common/_componentsProps.md"

### Mode Type

Union type for all possible values on `mode` property.

```ts
type Mode = `contain` | `cover`;
```

#### Usage

To dynamically set the `mode` property in `TwicImg` (or `TwicVideo`) component you must declare a variable of type `Mode`.

```ts
// component.ts
import { Mode } from "@twicpics/components/angular14";

@Component({
  selector: ...,
  templateUrl: ...,
  styleUrls: ...,
})
export class YourComponent {
  yourModeVariable:Mode = `contain`;
}
```

```html
<!-- component.html -->
<TwicImg src="path/to/your/image" [mode]="yourModeVariable"></TwicImg>
```


### Placeholder Type

Union type for all possible values on `placeholder` property.

```ts
type Placeholder = `maincolor` | `meancolor` | `none` | `preview`;
```

#### Usage

To dynamically set the `mode` property in `TwicImg` (or `TwicVideo`) component you must declare a variable of type `Placeholder`.

```ts
  // component.ts
  import { Placeholder } from "@twicpics/components/angular14";

  @Component({
    selector: ...,
    templateUrl: ...,
    styleUrls: ...,
  })
  export class YourComponent {
    yourPlaceholderVariable:Placeholder = `none`;
}
```

```html
<!-- component.html -->
<TwicImg
  src="path/to/your/image" 
  [placeholder]="yourPlaceholderVariable">
</TwicImg>
```

<div id='state-type'/>

### Loading State Values

Union type for all possible state values emitted through `@output` property `stateChangeEvent`.

```ts
type State = `error` | `done` | `loading` | `new`;
```

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


<div id='state-event-type'/>

### State Change Event

Data type emitted by `@output` property `stateChangeEvent`.

```ts
export type StateEvent = {
  target: TwicImgComponent | TwicVideoComponent,
  state: State
};
```


#include "src/_documentation/common/_cssVariables.md"



<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-angular-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"