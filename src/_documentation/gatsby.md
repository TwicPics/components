// /(\b)__COVER_NAME__(\b)/gm => "gatsby-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Gatsby"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://www.gatsbyjs.com/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "gatsby"
#include "src/_documentation/common/react/_replacerRules.md"

#include "src/_documentation/common/_cover.md"

#include "src/_documentation/common/_tableOfContents.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

#include "src/_documentation/common/_installation.md"

> [!NOTE]
> Discover our demonstrations and integration examples [in our online demo project](https://twicpics-gatsby-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

## Setup

### Setting up TwicPics Components in your `Gatsby` project

TwicPics components for `Gatsby` come as a `Gatsby Plugin` and are configured as [such](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/using-a-plugin-in-your-site/).

#include "src/_documentation/common/_requirement.md"

#### `gatsby-config.js`

Add `@twicpics/components/gatsby` to the plugins section with your TwicPics configuration as plugin options:

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

#include "src/_documentation/common/_usage.md"

Add the import part:
```js
// this component will be used in instead of an img element.
// nb : Gatsby uses react components
import { TwicImg } from "@twicpics/components/react";

// this component will be used in instead of a `picture` element.
// nb : Gatsby uses react components
import { TwicPicture } from "@twicpics/components/react";

// this component will be used in instead of a video element.
// nb : Gatsby uses react components
import { TwicVideo } from "@twicpics/components/react";
```

then, use `<TwicImg>`, `<TwicPicture>` or `<TwicVideo>` instead of standard tags `<img>`, `<picture>` or `<video>` (see [Components Properties](#components-properties)).

### Basic usage

> [!TIPS]
> TwicPics Components can also be used in `js`, `jsx`, `ts`, `tsx` files.

```js
// component.js
import * as React from 'react';
import { TwicImg } from "@twicpics/components/react";

const YourTemplate = () => (
  <TwicImg src="path/to/your/image"/>
);

export default YourTemplate;
```
#include "src/_documentation/common/_criticalImages.md"

#include "src/_documentation/common/_bulkLoading.md"

#include "src/_documentation/common/_zoomFeature.md"

#include "src/_documentation/common/react/_lifeCycle.md"

#include "src/_documentation/common/_refitFeature.md"

#include "src/_documentation/common/_styleDrivenApproach.md"

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



```html
<!-- component.jsx -->
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

#include "src/_documentation/common/_responsiveExample.md"

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
 
```html
<!-- component.html -->
<TwicImg
className="style-driven"
src="path/to/your/image"
></TwicImg>
```

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

```html
<!-- component.jsx -->
<TwicImg
  src="path/to/your/image"
  className="hero-image"
  ratio="none"
></TwicImg>
```

#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/react/_stateType.md"

#include "src/_documentation/common/_cssVariables.md"

#include "src/_documentation/common/_breakpoints.md"

## Examples

You can find usage examples [in our online demo project](https://twicpics-gatsby-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_license.md"
