// <__TWIC_SCOPE_video__> /^(?:__.*twicVideo.*__)?(\|.*\|.*)$/gm => "$1"
// <__TWIC_SCOPE_video__> /^(?:__.*twic.*__)(\|.*\|.*)$/gm => "__REMOVE_LINE__"

<div id='twic-video'/>

### `TwicVideo`

This component can be used in place of a `video` element.

```html
<TwicVideo
  src="<path>"
  anchor="<String>"
  bot="<String>"
  eager="<boolean>"
  focus="<auto|coordinates>"
  intrinsic="<String>"
  mode="<contain|cover>"
  position="<css position>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"__TWIC_STATE_CHANGE_PROP__
  step="<integer>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
/>
```
__TWIC_SCOPE_video__
#include "src/_documentation/common/componentsProps/_propsList.md"
__TWIC_SCOPE_video__