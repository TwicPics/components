
### Refit example

The `<TwicImg>` component allows to __reframe__ your image on the __main subject(s)__ it contains.

In **cover** `mode`, the resulting image while respect `ratio` while maximizing the area occupied by the main subject(s).

In **contain** `mode`, the image will be cropped as close as possible to the main subject(s).

To activate automatic cropping, simply add the `refit` property to your component.

By default, the subject will be placed at the center of the resulting image but it is possible to align the subject with a given border by specifying an `anchor`.

Also by default, the subject will touch the borders of the resulting image. This can be avoided by setting `refit` with a comma-separated [length](https://www.twicpics.com/docs/reference/parameters#length) value defining padding.

For example:

```html
  <!-- default refit: centered object(s), no padding around -->
  <TwicImg src="image1.jpg" refit />

  <!-- main subject(s) will be left aligned -->
  <TwicImg src="image3.jpg" anchor="left" refit/>

  <!-- a 5% padding will be applied around main subject(s) -->
  <TwicImg src="image2.jpg" refit="5p" />

  <!-- a 5% padding will be applied vertically, a 10% padding will be applied horizontally -->
  <TwicImg src="image3.jpg" refit="5p,10p" />
```