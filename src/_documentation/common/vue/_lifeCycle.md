<div id='lifecycle'/>

### Lifecycle

For `TwicImg` and `TwicVideo` components, passing a callback function to `stateChange` emitter gives access to the loading state of your image or video.

Here are the values the Component will emit ([see State Type definition](#state-type)) :

- `new`: when the `img` or `video` source has not started loading
- `loading`: when the `img` or `video` source is loading
- `done`: when the `img` or `video` source has successfully loaded
- `error`: when an error occurred while loading the `img` or `video` source


```html
<!-- component.vue -->
<template>
  <main>
    <div class="style-driven-responsive">
      <TwicImg
        src="path/to/your/image"
        @stateChange="handleStateChange"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    state:undefined
  },
  methods: {
    handleStateChange( stateEvent ) {
      // Implement the logic here
      const { state } = stateEvent;
      this.state = state;
      console.log( `TwicComponent emits a new state`, this.state );
    }
  }
};
</script>
```