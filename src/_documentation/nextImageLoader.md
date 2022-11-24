// /(\b)__COVER_NAME__(\b)/gm => "nextjs-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Next.js"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://nextjs.org/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "next"

#include "src/_documentation/common/_cover.md"

## Contents

- [Contents](#contents)
- [Overview](#overview)
  - [What is twicpicsLoader ?](#what-is-twicpicsloader-)
- [Setup](#setup)
  - [Configure twicpicsLoader in your Next.js project](#configure-twicpicsloader-in-your-nextjs-project)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Using fill](#using-fill)
  - [Using fit property](#using-fit-property)
  - [Using placeholder](#using-placeholder)

## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

<div id='what-is-twicpics-loader'/>

### What is twicpicsLoader ?

With **twicpicsLoader** you can use the native [next/image](https://nextjs.org/docs/api-reference/next/image) component while benefiting from the TwicPics CDN which guarantees you to get the best quality/weight compromise.

**twicpicsLoader** is a custom loader function used to resolve image URLs from your **TwicPics domain**.

This function only **applies to remote images**. For static images, the loader should not be used.

Here is an example of **next/image** use with **twicpicsLoader** as a custom loader.

```jsx
import Image from 'next/image'
import { twicpicsLoader } from "@twicpics/components/next";

const MyImage = (props) => {
  return (
    <Image
      loader={twicpicsLoader}
      src="image.jpg"
      alt="Image alt description"
      width={500}
      height={500}
    />
  )
}
```

#include "src/_documentation/common/_installation.md"

## Setup

### Configure twicpicsLoader in your Next.js project

If it does not exist, create an `.env` configuration file on the root of your project.

Add the following line to fill in the value of your [Twicpics domain](https://www.twicpics.com/docs/getting-started/fundamentals#domains-and-paths).

`.env`

```bash
NEXT_PUBLIC_TWICPICS_DOMAIN="https://<your-domain>.twic.pics/"
```

## Usage

### Basic usage

```jsx
import Image from 'next/image'
import { twicpicsLoader } from "@twicpics/components/next";

const MyImage = (props) => {
  return (
    <Image
      loader={twicpicsLoader}
      src="image.jpg"
      alt="Image alt description"
      width={500}
      height={500}
    />
  )
}
```

The width and height properties represent the rendered width and height in pixels.

Those properties are required, except when using `fill` property.

NB : by default, the adjustment property will stretch the image to fit the render size: the aspect-ratio of the image is therefore not guaranteed and depends on the values entered for the width and height.

### Using fill

```jsx
import Image from 'next/image'
import { twicpicsLoader } from "@twicpics/components/next";

const MyImage = (props) => {
  return (
    <div className="container">
      <Image
        loader={twicpicsLoader}
        src="image.jpg"
        alt="Image alt description"
        fill
      />
    </div>
  )
}
```

```css
.container {
  position: relative;
  height: 300px;
  width: 300px;
}
```

When using `fill` property, the image will fill the parent element whose dimensions have to be set in css.

NB : aspect-ratio of the image is not guaranteed and depends on the values entered for the width and height of its container.

### Using fit property

```jsx
import Image from 'next/image'
import { twicpicsLoader } from "@twicpics/components/next";

const MyImage = (props) => {
  return (
    <div className="container">
      <Image
        className="contain"
        loader={twicpicsLoader}
        src="image.jpg"
        alt="Image alt description"
        fill
      />
    </div>
    <div className="container">
      <Image
        className="cover"
        loader={twicpicsLoader}
        src="image.jpg"
        alt="Image alt description"
        fill
      />
    </div>
  )
}
```

```css
.container {
  overflow: hidden;
  position: relative;
  height: 300px;
  width: 300px;
}

.contain {
  object-fit: contain;
}

.cover {
  object-fit: cover;
}
```

The previous example shows how to preserve aspect-ratio.

`object-fit: contain` will lead to a letterboxed image while `object-fit: cover` will lead to an image that filled it's container being cropped in order to preserve aspect-ratio.


### Using placeholder


**Only with `Next 13+`.**

The native **next/image** component exposes a `placeholder` property which when set to "blur" displays a `lqip` while the image is loading.
In this case, we need to provide a value to prop `blurDataURL` that represents the low quality image as a `base64`.

Twicpics provides a helper to get a `blurDataURL` value.


```jsx
import Image from 'next/image'
import { twicpicsLoader, twicpicsPlaceholder } from "@twicpics/components/next";

export async function getServerSideProps( ) {
  const datas = {
    "src": `image.jpg`,
  };
  datas.blurDataURL = await twicpicsPlaceholder( `image:football.jpg` );
  return {
    "props": {
      datas,
    },
  };
}

const MyImage = ( { datas } ) => {
  return (
    <Image
      loader={twicpicsLoader}
      src={datas.src}
      placeholder="blur"
      blurDataURL={datas.blurDataURL}
      alt="Image alt description"
    />
  )
}
```

In this example we choose to use `getServerSideProps` function but feel free to use the [data fetching]([getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)) function you need.

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"