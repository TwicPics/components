// /(\b)__COVER_NAME__(\b)/gm => "angular-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Angular"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://angular.io/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "angular"
// /(\b)__TWIC_STATE_TABLE_CONTENT__(\b)/gm => "\n    - [Lifecycle](#lifecycle)"
// /(\b)__TWIC_STATE_CHANGE_PROP__(\b)/gm => "\n  (stateChangeEvent)=\"<function>\""
// /(\b)__TWIC_STATE_CHANGE__(\b)/gm => "\n| `stateChangeEvent` | An event emitter triggered each time the asset loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`EventEmitter<StateEvent>`](#state-event-type) | |"


#include "src/_documentation/common/_cover.md"

#include "src/_documentation/common/_tableOfContents.md"

## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

TwicPics Components are available in Angular __version 11 to 17__.

Discover our demonstrations and integration examples [in a standalone components based project](https://twicpics-angular-demo.netlify.app/home?utm_source=github&utm_campaign=components&utm_medium=organic).

For an example of integration into an NgModule-based project, please refer to [this repo](https://github.com/TwicPics/components-demo-angular/tree/ng-module-based-application).


#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

### Setting-up TwicPics Components into your `Angular` project

<doc-alert type="info">You will need a TwicPics domain to initialize the package. <a href="https://account.twicpics.com/signup" target="_blank">Create an account for free</a> to get your domain.</doc-alert>

Add the import part 

```ts
import { installTwicPics } from '@twicpics/components/angular17'
```

and the configuration part (see [Setup Options](#setup-options))

```ts
installTwicPics({
  // domain is mandatory
  domain: 'https://<your-domain>.twic.pics',
})
```

into the main component of your `Angular` project.

#### app.component.ts

```ts
//here is an example of a `Angular` app.component.ts configured with TwicPics.
import { Component } from '@angular/core'
import { installTwicPics } from '@twicpics/components/angular17'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: ''./app.component.css',
})
export class AppComponent {}

// TwicPics Components configuration
installTwicPics({
  domain: 'https://<your-domain>.twic.pics',
  anticipation: 0.5,
  breakpoints: {
    sm: 576,
  }
  step: 100,
})
```

#include "src/_documentation/common/_setupOptions.md"

## Components importation

TwicPics components for `Angular` comes as an [Angular Module](https://angular.io/guide/architecture-modules).

Depending on the nature of your application, you'll need to import them either:
- directly into a [standalone component](https://angular.io/guide/standalone-components)
- into the application's **root module** (when using a [NgModule-based application](https://angular.io/guide/architecture-modules))

### Using in a standalone component

```ts
// src/app/example/example.component.ts
import { Component } from '@angular/core';
import { TwicPicsComponentsModule } from '@twicpics/components/angular17';

@Component({
  // example is a standalone component
  standalone: true,
  selector: 'app-example',
  styleUrls: ['./example.component.scss'],
  templateUrl: './example.component.html',
  // TwicPics components are imported directly into you standalone component
  imports: [ TwicPicsComponentsModule ]
})
export class ExampleComponent {
  // logic
}
```

### Using in NgModule-based application

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { TwicPicsComponentsModule } from '@twicpics/components/angular14'
// other imports

@NgModule({
  declarations: [AppComponent],
  imports: [TwicPicsComponentsModule, ... other imported modules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<div id='usage'/>

## Usage

`TwicImg`, `TwicPicture` and `TwicVideo` are available for use in the scope of the module into which you have imported `TwicPicsComponentsModule` [see Module Declaration](#module-declaration).

Just use them in your template files in place of `img`, `picture` or `video` tags.

```html
<!-- component.html -->
<TwicImg src="path/to/your/image"></TwicImg>
<TwicPicture src="path/to/your/video"></TwicPicture>
<TwicVideo src="path/to/your/video"></TwicVideo>
```

<div id='basic-usage'/>

### Basic usage

```html
<!-- component.html -->
<main>
  <TwicImg src="path/to/your/image"/>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-basic-grid%2Ftwic-basic-grid.component.html&initialpath=basic-grid)

#include "src/_documentation/common/_criticalImages.md"

#include "src/_documentation/common/_bulkLoading.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-bulk-loading%2Ftwic-bulk-loading.component.html&initialpath=bulk-loading)

#include "src/_documentation/common/_styleDrivenApproach.md"

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-style-driven%2Ftwic-style-driven.component.html&initialpath=style-driven)

<div id='lifecycle'/>

### Lifecycle

For `TwicImg` and `TwicVideo` components, binding to `stateChangeEvent` gives access to the loading state of your image or video.

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
#### Using standalone component

```ts
  // component.ts
  import { ChangeDetectorRef, Component } from "@angular/core";
  import { State, StateEvent, TwicPicsComponentsModule, TwicImgComponent } from "@twicpics/components/angular13";

  @Component({
    ...
    standalone: true,
    imports: [TwicPicsComponentsModule]
    ...
  })
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

    // other logic
  }
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src/app/twic-state/twic-state.component.html&initialpath=state)

#### Using NgModule-based application

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

#include "src/_documentation/common/_zoomFeature.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src/app/twic-zoom/twic-zoom.component.html&initialpath=zoom)

#include "src/_documentation/common/_refitFeature.md"

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src/app/twic-refit/twic-refit.component.html&initialpath=refit)

#include "src/_documentation/common/_responsiveExample.md"

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
 
```html
<!-- component.html -->
<main>
  <div class="style-driven-responsive">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-art-direction%2Ftwic-art-direction.component.html&initialpath=art-direction)

#include "src/_documentation/common/_workingWithRatioNone.md"

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TwicPics/components-demo-angular?file=src%2Fapp%2Ftwic-hero%2Ftwic-hero.component.html&initialpath=hero)


#include "src/_documentation/common/_componentsProps.md"

### Anchor Type

Union type for all possible values on `anchor` property.

```ts
type Anchor = `bottom` | `bottom-left` | `bottom-right` | `center` | `left` | `top` | `top-left` | `top-right` | `right`;
```

#### Usage

To dynamically set the `anchor` property in `TwicImg` (or `TwicVideo`) component you must declare a variable of type `Anchor`.

```ts
// component.ts
import { Anchor } from "@twicpics/components/angular14";

@Component({
  selector: ...,
  templateUrl: ...,
  styleUrls: ...,
})
export class YourComponent {
  yourAnchorVariable:Anchor = `top-left`;
}
```

```html
<!-- component.html -->
<TwicImg src="path/to/your/image" [anchor]="yourAnchorVariable"></TwicImg>
```


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

#include "src/_documentation/common/_breakpoints.md"

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-angular-demo.netlify.app/home?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_license.md"
