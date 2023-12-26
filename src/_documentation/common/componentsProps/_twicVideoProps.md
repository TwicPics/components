// <__TWIC_SCOPE_video__> /^(?:__.*twicVideo.*__)?(\|.*\|.*)$/gm => "$1"
// <__TWIC_SCOPE_video__> /^(?:__.*twic.*__)(\|.*\|.*)$/gm => "__REMOVE_LINE__"

### TwicVideo

This component is a drop-in replacement for `video`.

It provides seamless playback for [videos optimized with TwicPics](https://www.twicpics.com/docs/topics/video-optimization), offering advanced features like optimized _Cumulative Layout Shift_ (CLS), _Low-Quality Image Placeholder_ (LQIP), and lazy loading out of the box.

```html
<TwicVideo
  src="<path>"
  anchor="<String>"
  bot="<String>"
  duration="<String|number>"
  eager="<boolean>"
  from="<String|number>"
  focus="<auto|coordinates>"
  intrinsic="<String>"
  mode="<contain|cover>"
  position="<css position>"
  posterFrom="<String|number>"
  placeholder="<preview|maincolor|meancolor|none>"
  preTransform="<String>"
  ratio="<ratio>"__TWIC_STATE_CHANGE_PROP__
  step="<integer>"
  title="<String>"
  to="<String|number>"
  transition="<fade|zoom|none>"
  transitionDelay="<String>"
  transitionDuration="<String>"
  transitionTimingFunction="<String>"
/>
```
__TWIC_SCOPE_video__
#include "src/_documentation/common/componentsProps/_propsList.md"
__TWIC_SCOPE_video__