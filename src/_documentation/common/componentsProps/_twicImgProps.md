// <__TWIC_SCOPE_image__> /^(?:__.*twicImg.*__)?(\|.*\|.*)$/gm => "$1"
// <__TWIC_SCOPE_image__> /^(?:__.*twic.*__)(\|.*\|.*)$/gm => "__REMOVE_LINE__"


<div id='twic-img'/>

### `TwicImg`

This component can be used in place of an `img` element.

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
