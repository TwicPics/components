
# [TwicPics Components](https://www.npmjs.com/package/@twicpics/components)

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

![TwicPics Components](https://raw.githubusercontent.com/twicpics/components/0.29.0/documentation/resources/components-cover.png)



## What is TwicPics?

[TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) is a **Responsive Media Service Solution** (SaaS) that enables **on-demand responsive image & video generation**.

With TwicPics, developers only deal with high-resolution versions of their media while end-users receive **optimized, perfectly sized, device-adapted** versions **delivered from a server close to them**.

TwicPics acts as a **proxy**. It retrieves your master file — from your web server, cloud storage, or DAM — and generates a **device-adapted** version with **best-in-class compression**, delivered directly to the end-user from the **closest available delivery point**.


## What is TwicPics Components?

**TwicPics Components** is a **collection of web components** that make it dead easy to unleash the power of [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) in your projects.

Whether you need to display a content image, showcase a short video, or ensure optimal performance with _Large Contentful Paint_ (LCP) care, TwicPics Components has you covered.

### Display a Critical Image

If you need to display **critical images** with _art direction_ support, you can use the `<TwicPicture>` component.

It is a drop-in replacement for the standard `picture` tag and is based directly on the [TwicPics API](https://www.twicpics.com/docs/essentials/api?utm_source=github&utm_medium=organic&utm_campaign=components) without additional effort.


```html
<!-- Before -->
<picture>
  <source
    media="(min-width: 1280px)"
    srcset="wide-image.jpg, wide-image-2x.jpg 2x, wide-image-3x.jpg 3x"
  >
  <source
    media="(min-width: 768px)"
    srcset="squared-image.jpg, squared-image-2x.jpg 2x, squared-image-3x.jpg 3x"
  >
  <img
    srcset="portrait-image.jpg, portrait-image-2x.jpg 2x, portrait-image-3x.jpg 3x"
    src="portrait-image.jpg"
  >
</picture>

<!-- After -->
<TwicPicture
  src="your-master-image.jpg"
  ratio="3/4, @md 1, @xl 16/9"
/>
```

### Display a Content Image

Suppose you want to display a **pixel-perfect image** with optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP), and lazy loading out of the box. In that case, you can use the `<TwicImg>` component.

It's a drop-in replacement for the standard `img` tag based on the [TwicPics Script](https://www.twicpics.com/docs/essentials/native?utm_source=github&utm_medium=organic&utm_campaign=components).

```html
<!-- Before -->
<img src="https://example.com/your-image.jpg" />

<!-- After -->
<TwicImg src="your-image.jpg" />
```

### Display a Video

For seamless playback of [videos optimized with TwicPics](https://www.twicpics.com/docs/guides/video-optimization?utm_source=github&utm_medium=organic&utm_campaign=components), use the `<TwicVideo>` component. It's a sibling of `<TwicImg>` and serves as a drop-in replacement for the standard `video` tag.


```html
<!-- Before -->
<video >
  <source src="https://example.com/your-video.mp4" type="video/mp4">
  <!-- ... other video sources ... -->
</video>

<!-- After -->
<TwicVideo src="your-video.mp4" />
```


## Supported frameworks

- [Angular](https://github.com/TwicPics/components/blob/0.29.0/documentation/angular.md) (version 11+)
- [React](https://github.com/TwicPics/components/blob/0.29.0/documentation/react.md), [React Native](https://github.com/TwicPics/components/blob/0.29.0/documentation/react-native.md), [Gatsby](https://github.com/TwicPics/components/blob/0.29.0/documentation/gatsby.md) and [Next.js](https://github.com/TwicPics/components/blob/0.29.0/documentation/next.md)
- [Svelte (version 3)](https://github.com/TwicPics/components/blob/0.29.0/documentation/svelte3.md), [Svelte (version 4)](https://github.com/TwicPics/components/blob/0.29.0/documentation/svelte4.md), [Svelte (version 5)](https://github.com/TwicPics/components/blob/0.29.0/documentation/svelte5.md) and [SvelteKit](https://github.com/TwicPics/components/blob/0.29.0/documentation/svelteKit.md)
- [Vue.js (version 2)](https://github.com/TwicPics/components/blob/0.29.0/documentation/vue2.md), [Vue.js (version 3)](https://github.com/TwicPics/components/blob/0.29.0/documentation/vue3.md), [Nuxt.js (version 2)](https://github.com/TwicPics/components/blob/0.29.0/documentation/nuxt2.md) and [Nuxt.js (version 3)](https://github.com/TwicPics/components/blob/0.29.0/documentation/nuxt3.md)
- [Web Components](https://github.com/TwicPics/components/blob/0.29.0/documentation/webComponents.md)

## Online demonstrations

Regardless of the framework you work with, [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) is the most efficient solution to deliver your images and your videos and make them as responsive as desired.

Explore our demos and integration examples for :

- [Angular](https://twicpics-angular-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic)
- [React](https://twicpics-react-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic), [Next.js](https://twicpics-next-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic) and [Gatsby.js](https://twicpics-gatsby-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic)
- [Vue.js (version 2)](https://twicpics-vue2-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic), [Vue.js (version 3)](https://twicpics-vue3-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic), [Nuxt.js (version 2)](https://twicpics-nuxt2-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic) and [Nuxt.js (version 3)](https://twicpics-nuxt3-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic)
- [Svelte (version 3)](https://twicpics-svelte3-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic), [Svelte (version 4)](https://twicpics-svelte4-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic), [Svelte (version 5)](https://twicpics-svelte5-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic) and [SvelteKit](https://twicpics-sveltekit-demo.netlify.app/?utm_source=github&utm_campaign=components&utm_medium=organic)


## Questions and feedback

Feel free to submit an [issue](https://github.com/TwicPics/components/issues) or ask us anything by emailing [support@twic.pics](mailto:support@twic.pics).


[license-image]: https://img.shields.io/npm/l/@twicpics/components.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/twicpics/components/master/LICENSE
[npm-image]: https://img.shields.io/badge/npm-v0.29.0-orange.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@twicpics/components/v/0.29.0