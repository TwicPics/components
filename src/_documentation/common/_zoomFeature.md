
### Image magnifier

The `<TwicImg>` component lets you display a **lazy loaded**, zoomed version of your image on **mouseover**.

To activate the zoom feature, set the `zoom` property to a number strictly greater than 1. This number represents the magnification factor of your image.

For example:

```html
  <TwicImg src="image1.jpg" zoom="2" />
  <TwicImg src="image2.jpg" zoom="2.5" />
```

The zoom factor can also be configured through the `--twic-zoom` [CSS variable](#css-variables).

To activate the [style-driven zoom](#style-driven-approach), set the `zoom` property to `'css'` and add a new rule to your stylesheet.

For example:

```html
  <TwicImg src="image3.jpg" zoom="css" class=".zoom-3"/>
```

```css
.zoom-3 {
  --twic-zoom:3;
}
```

It applies only to the `TwicImg` component in **cover** `mode`.
