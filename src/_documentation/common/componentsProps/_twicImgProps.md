// <__TWIC_SCOPE_image__> /^(?:__.*twicImg.*__)?(\|.*\|.*)$/gm => "$1"
// <__TWIC_SCOPE_image__> /^(?:__.*twic.*__)(\|.*\|.*)$/gm => "__REMOVE_LINE__"


<div id='twic-img'/>

### `TwicImg`

This component is a drop-in replacement for `img` dedicated to content images.

It offers advanced features like optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP) and lazy loading out of the box.


```html
<TwicImg
  src="<path>"
  alt="<String>"
  anchor="<String>"
  bot="<String>"
  eager="<boolean>"
  focus="<auto|coordinates>"
  intrinsic="<String>"
  mode="<contain|cover>"__TWIC_ON_STATE_CHANGE_PROP__
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"__TWIC_STATE_CHANGE_PROP__
  refit="<boolean|String>"
  step="<integer>"
  title="<String>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
  zoom="<String | Number>"
/>
```
__TWIC_SCOPE_image__
#include "src/_documentation/common/componentsProps/_propsList.md"
__TWIC_SCOPE_image__
