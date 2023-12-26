### Loading State Values

Union type for all possible image or video loading states:

```ts
type State = `error` | `done` | `loading` | `new`;
```

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


### State Change Event

Data type passed as a parameter to the `stateChange` emitter:

```ts
export type StateEvent = {
  target: TwicImg | TwicVideo,
  state: State
};
```
