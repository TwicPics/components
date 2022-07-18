<div id='components-props'/>

## Components Properties

<div id='twic-img'/>

### `TwicImg`

This component can be used in place of an `img` element.

```html
<TwicImg
  src="<path>" (mandatory)
  alt="<string>"
  anchor="<string>"
  ratio="<ratio>"
  mode="<contain|cover>"
  focus="<auto|coordinates>"
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<string>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
  step="<integer>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `alt` | `alt` attribute content | `String` | based on `src` |
| `anchor` | Allows to define the positioning of an image inside its container in `contain` mode and the focus point in `cover` mode. Syntax is `top`, `bottom`, `left`, `right`, `center` and combinations `left top` or `left-top` and so on. When supplied, `anchor` will take precedence over `position` and `focus` properties in `contain` and `cover` mode respectively. When provided in combination with a `preTransform` value, an optional `focus` value will be applied before the transformation, while `anchor` will be applied just before the final transformation (contain or cover). | `String` | |
| `focus` | Allows to set the focus point before transformation(s) provided with a `preTransform` value or before terminal cover transformation (`mode` = `'cover'`). When `anchor` is provided it takes precedence over `focus` unless `preTransform` is also set. In this case, `focus` is then applied before transformations defined with `preTransform`. Can be `auto` or coordinates. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-focus) for more information. | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `position` | Only useful in `contain` mode. Locates the image inside the area. When `anchor` is provided it takes precedence over `position`. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/api/transformations) to be performed before resizing the image (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/api/manipulations)). If `focus` is supplied, it is applied first. Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` value pair (as in `4/3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser in respect with `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String` | `1` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/api/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Determines how image will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`), both (`fade zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` |

<div id='twic-video'/>

### `TwicVideo`

This component can be used in place of a `video` element.

```html
<TwicVideo
  src="<path>" (mandatory)
  anchor="<string>"
  ratio="<ratio>"
  mode="<contain|cover>"
  focus="<auto|coordinates>"
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<string>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
  step="<integer>"
/>
```

| Attribute | Description | Type | Default |
|:-|:-|:-|:-|
| `anchor` | Allows to define the positioning of an image inside its container in `contain` mode and the focus point in `cover` mode. Syntax is `top`, `bottom`, `left`, `right`, `center` and combinations `left top` or `left-top` and so on. When supplied, `anchor` will take precedence over `position` and `focus` properties in `contain` and `cover` mode respectively. When provided in combination with a `preTransform` value, an optional `focus` value will be applied before the transformation, while `anchor` will be applied just before the final transformation (contain or cover). | `String` | |
| `focus` | Allows to set the focus point before transformation(s) provided with a `preTransform` value or before terminal cover transformation (`mode` = `'cover'`). When `anchor` is provided it takes precedence over `focus` unless `preTransform` is also set. In this case, `focus` is then applied before transformations defined with `preTransform`. Can be `auto` or coordinates. See the [TwicPics focus attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-focus) for more information. | `String` | |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. See the [TwicPics output transformation documentation](https://www.twicpics.com/docs/api/transformations#output) for more information. Setting will be overridden to `none` when using `zoom` `transition`. | `String` | `preview` |
| `position` | Only useful in `contain` mode. Locates the image inside the area. When `anchor` is provided it takes precedence over `position`. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `String` | `center` |
| `preTransform` | A slash-separated list of [TwicPics API transformations](https://www.twicpics.com/docs/api/transformations) to be performed before resizing the video (see the [TwicPics Manipulation documentation](https://www.twicpics.com/docs/api/manipulations)). If `focus` is supplied, it is applied first. Be aware that using this option can lead to unexpected results so use with caution! | `String` | |
| `ratio` | A unitless `width/height` value pair (as in `4/3`) that defines the aspect ratio of the display area. If `height` is not specified, it is assumed to be `1`. A square area will be created by default. When set to `none`, ratio is determined based on width and height as computed by the browser in respect with `CSS` definitions. The `--twic-ratio` CSS variable is ignored in this instance. You are responsible for properly sizing the component when `ratio="none"`. | `String` | `1` |
| `src` | Path to the image. When not provided, a red lightweight `svg` [placeholder](https://www.twicpics.com/docs/api/placeholders) that displays its intrinsic dimensions is displayed in place of the absent image. When [env](#setup-options) is set to `offline`, that red lightweight `svg` is replaced by a simple red placeholder. | `String` | |
| `step` | See the [TwicPics step attribute documentation](https://www.twicpics.com/docs/script/attributes#data-twic-step) for more information. | `Integer` | `10` |
| `transition` | Determines how video will be revealed once loaded. With a fade in effect (`fade`), a zoom effect (`zoom`), both (`fade+zoom`) or without any transition (`none`). Unsupported values are handled as `fade`. | `String` | `fade` |
| `transitionDelay` | [Transition delay of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) | `String` | `0ms` |
| `transitionDuration` | [Duration of the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) | `String` | `400ms` |
| `transitionTimingFunction` | [CSS timing function applied to the transition effect.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) | `String` | `ease` |