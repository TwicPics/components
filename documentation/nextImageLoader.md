



![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.13.1/documentation/resources/nextjs-cover.png)



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

<div id='what-is-twicpics'/>

### What is [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components)? 

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) is a __Responsive Image Service Solution__ (SaaS) that enables __on-demand responsive image generation__.

With [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components), developers only deal with high-resolution versions of their media while end-users receive __optimized, perfectly sized, device-adapted__ versions __delivered from a server close to them__.

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) acts as an __image proxy__. It requests your master image, be it on your own web server, cloud storage or DAM, then generates a __device-adapted__ version with __best-in-class compression__, delivered directly to the end-user from the __closest delivery point__ available.

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

Thanks to the open source [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) Components, delivering responsive images in your [Next.js](https://nextjs.org/) projects has never been easier.

<div id='installation'/>

## Installation

<div id='create-an-account'/>

### Requirement

The only requirement is to have a TwicPics account. 
If you don't already have one, you can easily [create your own TwicPics account for free](https://account.twicpics.com/signup).

<div id='adding-twicpics-components-to-your-project'/>

### Installing `@twicpics/components` into your project
You just need to add the [@twicpics/components](https://www.npmjs.com/) npm package to your project.

Simply type one of:

```bash
npm install @twicpics/components
```

or 

```bash
yarn add @twicpics/components
```

depending on which package manager you fancy.

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

<div id='getting-help'/>

## Questions and feedback

Fell free to submit an [issue](https://github.com/TwicPics/components/issues) or to ask us anything by dropping an email at [support@twic.pics](mailto:support@twic.pics).


<div id='other-frameworks'/>

## Other frameworks

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) provides the most versatile solution on the market for delivering responsive media.

TwicPics Components are available [in the most popular javascript frameworks](https://www.npmjs.com/package/@twicpics/components).


<div id='licence'/>

## Licence

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

[license-image]: https://img.shields.io/npm/l/@twicpics/components.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/twicpics/components/master/LICENSE
[npm-image]: https://img.shields.io/badge/npm-v0.13.1-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.13.1