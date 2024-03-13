
### What is TwicPics Components?

**TwicPics Components** is a **collection of web components** that make it dead easy to unleash the power of [TwicPics](https://www.twicpics.com/?utm_source=github&utm_medium=organic&utm_campaign=components) in your projects.

Whether you need to display a content image, showcase a short video, or ensure optimal performance with _Large Contentful Paint_ (LCP) care, TwicPics Components has you covered.

#### Display a Critical Image

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

#### Display a Content Image

Suppose you want to display a **pixel-perfect image** with optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP), and lazy loading out of the box. In that case, you can use the `<TwicImg>` component.

It's a drop-in replacement for the standard `img` tag based on the [TwicPics Script](https://www.twicpics.com/docs/essentials/native?utm_source=github&utm_medium=organic&utm_campaign=components).

```html
<!-- Before -->
<img src="https://example.com/your-image.jpg" />

<!-- After -->
<TwicImg src="your-image.jpg" />
```

#### Display a Video

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
