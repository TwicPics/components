<div id='lifecycle'/>

### Lifecycle

For `TwicImg` and `TwicVideo` components, passing a callback function to `onStateChange` gives access to the loading state of your image or video.

Here are the values the Component will emit ([see State Type definition](#state-type)) :

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

__WARNING__: when using `onStateChange` in a **Server Components module graph**, your component must be decorated with [use client directive](https://nextjs.org/docs/getting-started/react-essentials#the-use-client-directive), as in

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