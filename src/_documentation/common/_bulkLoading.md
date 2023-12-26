### Bulk loading with TwicView

By default, `<TwicImg>` and `<TwicVideo>` will only start loading when they enter the viewport. But sometimes, you may want to load multiple assets in bulk instead of lazy loading them. This is where `<TwicView>` comes into play.

The `<TwicView>` component eagerly loads all of his `<TwicImg>` and `<TwicVideo>` children as soon as it enters the viewport (depending on your [anticipation settings](#setup-options).)

For example, if you're building a carousel, you might want to bulk-load all images. In the following code, all three images will be loaded when `TwicView` comes into the viewport:

```html
<TwicView>
  <TwicImg src="image1.jpg" />
  <TwicImg src="image2.jpg" />
  <TwicImg src="image3.jpg" />
</TwicView>
```