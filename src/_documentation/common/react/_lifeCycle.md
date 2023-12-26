### Lifecycle

For the `TwicImg` and the `TwicVideo` components, passing a callback function to `onStateChange` gives access to your image or video loading state.

Here are the values the Component will emit ([see State Type definition](#loading-state-values)):

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source

```js
  // component.jsx
  const [ state, setState ] = useState( undefined );
  
  const handleStateChange = ( stateEvent ) => {
    // Implement the logic here
    const { state } = stateEvent;
    console.log( `TwicComponent emits a new state`, state );
    setState( state );
  }

  return (
    <TwicImg
      onStateChange={handleStateChange}
      src="path/to/your/image"
    />
  )
```

> [!WARNING]
> When using `onStateChange` in a **Server Components module graph**, your component must be decorated with [use client directive](https://nextjs.org/docs/getting-started/react-essentials#the-use-client-directive), as in:

```js
  'use client'
  
  // your imports

  const [ state, setState ] = useState( undefined );
  
  const handleStateChange = ( stateEvent ) => {
    // Implement the logic here
    const { state } = stateEvent;
    console.log( `TwicComponent emits a new state`, state );
    setState( state );
  }

  return (
    <TwicImg
      onStateChange={handleStateChange}
      src="path/to/your/image"
    />
  )
```