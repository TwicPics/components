
### Critical Images

`TwicPicture` streamlines the use of `picture` elements and `srcset` attributes.

It operates independently of the [TwicPics Script](https://www.twicpics.com/docs/essentials/script) and dynamically generates `source` elements and `srcset` attributes from a single master file using variants transformed through the [TwicPics API](https://www.twicpics.com/docs/guides/writing-api-requests).

#### Resolution switching

Following examples illustrate how to serve different resolutions of the same image accordingly to `breakpoints` and `maxDPR` defined in [Setup Options](#setup-options).

```html
<!-- Populate srcset and fallback with a list of squared variants -->
<TwicPicture src="your-lcp-image.jpg"></TwicPicture>
```

```html
<!-- Populate srcset and fallback with a list of 16/9 variants -->
<TwicPicture
  src="your-lcp-image.jpg"
  ratio="16/9"
></TwicPicture>
```

```html
<!-- eager disables lazy-loading and sets fetchpriority to high -->
<TwicPicture
  src="your-lcp-image.jpg"
  eager
></TwicPicture>
```

```html
<!-- for best performances set sizes attribute is a best practice -->
<TwicPicture
  src="your-lcp-image.jpg"
  eager
  sizes="
    (min-width: 1000px) 33vw,
    96vw
  "
></TwicPicture>
```

For a comprehensive list of properties and detailed information, please refer to [TwicPicture](#twic-picture).

#### Art Direction

To achieve _art direction_, simply configure the following `TwicPicture`'s properties in accordance with the __mobile-first principle__:

- anchor
- focus
- mode
- position
- ratio

Following examples illustrate how to serve various image variations based on distinct _artistic directions_ and 
[default breakpoints value](#default-breakpoints):

```html
<!--
  This will display a :
  squared variant (default ratio) for screen with a width < 1024 px
  4/3 variant for screen with a width >= 1024 px
  21/9 variant for screen with a width >= 1280 px
-->
<TwicPicture
  src="art.jpg"
  alt="Art Direction Example"
  ratio="
    @lg 4/3
    @xl 21/9
  "
/>

<!--
  This allows to change the focus point for screen with a width >= 1280 px
-->
<TwicPicture
  src="art.jpg"
  alt="Art Direction Example"
  ratio="
    @lg 4/3
    @xl 21/9
  "
  focus="@xl top"
/>

<!--
  You can also configure a custom breakpoint
-->
<TwicPicture
  src="art.jpg"
  alt="Art Direction Example"
  ratio="
    @lg 4/3
    @xl 21/9
  "
  focus="
    @666 bottom
    @xl top
  "
/>
```

[Default breakpoints value](#default-breakpoints) can be configured [here](setup-options).