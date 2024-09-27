// /(\b)__TWIC_STATE_TABLE_CONTENT__(\b)/gm => "\n  - [Lifecycle](#lifecycle)"
// /(\b)__TWIC_ON_STATE_CHANGE_PROP__(\b)/gm => "\n  onStateChange=\"<function>\""
// /(\b)__TWIC_ON_STATE_CHANGE_ASSET__(\b)/gm => "\n| `onStateChange` | A callback function triggered each time the asset loading state is updated. State can be `new`, `loading`, `done` or `error`.| [`( stateEvent: StateEvent ) => void`](#loading-state-values) | |"
// /crossorigin(?=[`=])/gm => "crossOrigin"
// /referrerpolicy(?=[`=])/gm => "referrerPolicy"
// /tabindex(?=[`=])/gm => "tabIndex"
// /(\b)role=\"<String>\"/gm => "role=\"<React.AriaRole>\""
// /(\b)style=\"<Object\|String>\"/gm => "style=\"<React.CSSProperties>\""
// /`style` \| .*`Object or String` \| /gm §="Object or String" => "React.CSSProperties"
// /`role` \| .*`String` \| /gm §="String" => "React.AriaRole"


