// <__TWIC_SCOPE_picture__> /^(?:__.*twicPicture.*__)?(\|.*\|.*)$/gm => "$1"
// <__TWIC_SCOPE_picture__> /^(?:__.*twic.*__)(\|.*\|.*)$/gm => "__REMOVE_LINE__"
// /(\spicture\s)/gm => " image "
// /(\spicture\.)/gm => " image."



### TwicPicture

This component serves as a seamless replacement for the `picture` element.

With a primary focus on maximizing the _Largest Contentful Paint_ (LCP) score with optimized _Cumulative Layout Shift_ (CLS), it effortlessly generates the `srcset` and `source` attributes for _resolution switching_ and _art direction_, all derived from a **single master file** transformed through the [TwicPics API](https://www.twicpics.com/docs/guides/writing-api-requests).


```html
<TwicPicture
  src="<path>"
  alt="<String>"
  anchor="<String>"
  eager="<boolean>"
  fetchpriority="<high|low|auto>"
  focus="<auto|coordinates>"
  mode="<contain|cover>"
  position="<String>"
  preTransform="<String>"
  ratio="<ratio>"
  refit="<boolean|String>"
  sizes="<String>"
  title="<String>"
/>
```
__TWIC_SCOPE_picture__
#include "src/_documentation/common/componentsProps/_propsList.md"
__TWIC_SCOPE_picture__
