### Working with ratio="none"

#### With TwicPicture

It is helpful if you want to display an image with its intrinsic aspect ratio without cropping.

When using `ratio="none"`, there is no CLS optimization, and you are responsible for it.

```html
<!-- will display your image with it's intrinsic ratio, without any cropping -->
<TwicPicture>
  src="path/to/your/image"
  ratio="none"
</TwicPicture>
```

#### With TwicImg and TwicVideo

It is particularly useful when creating a "hero" banner. You can specify the height of your image while respecting its natural aspect ratio, and optimizing your _Cumulative Layout Shift_ (CLS) metric.

When using `ratio="none"`, you are responsible for properly sizing the component.