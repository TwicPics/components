<div id='state-type'/>

### Loading State Values

Union type for all possible image or video loading state.

```ts
type State = `error` | `done` | `loading` | `new`;
```

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


<div id='state-event-type'/>

### State Change Event

Data type passed as parameter to `onStateChange` function.

```ts
export type StateEvent = {
  target: TwicImg | TwicVideo,
  state: State
};
```
