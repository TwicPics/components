// <__TWIC_SCOPE_image__> /^(?:__.*twicImg.*__)?(\|.*\|.*)$/gm => "$1"
// <__TWIC_SCOPE_image__> /^(?:__.*twic.*__)(\|.*\|.*)$/gm => "__REMOVE_LINE__"

### TwicImg

This component is a drop-in replacement for the `img` tag dedicated to content images.

It offers advanced features like optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP), and lazy loading out of the box.


```html
<TwicImg
  src="<path>"
  alt="<String>"
  anchor="<String>"
  aria-*="<String>"
  bot="<String>"
  crossorigin="<anonymous|use-credentials>"
  decoding="<async|auto|sync>"
  draggable="<boolean>"
  eager="<boolean>"
  focus="<auto|coordinates>"
  id="<String>"
  intrinsic="<String>"
  mode="<contain|cover>"__TWIC_ON_STATE_CHANGE_PROP__
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"__TWIC_STATE_CHANGE_PROP__
  referrerpolicy="<no-referrer|no-referrer-when-downgrade|origin|`origin-when-cross-origin|same-origin|strict-origin|strict-origin-when-cross-origin|unsafe-url>"
  refit="<boolean|String>"
  role="<String>"
  step="<integer>"
  style="<Object|String>"
  tabindex="<integer>"
  title="<String>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
  zoom="<number|String>"
/>
```
__TWIC_SCOPE_image__
#include "src/_documentation/common/componentsProps/_propsList.md"
__TWIC_SCOPE_image__
