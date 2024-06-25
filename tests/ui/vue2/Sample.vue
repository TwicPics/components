<template>
  <div :class="containerClass">
    <component
      :is="TwicComponent"
      :src="src"
      v-bind="rest"
    />
  </div>
</template>

<script>
export default {
  name: "Sample",
  data() {
    return {
      containerClass :'',
      src: '',
      TwicComponent: 'TwicImg',
      rest: {}
    };
  },
  mounted() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');
    const { src = 'football.jpg' , containerClass = 'default', component = 'TwicImg' , ...rest } = params;
    this.TwicComponent = component === 'TwicImg' ? 'TwicImg' : ( component === 'TwicVideo' ? 'TwicVideo' : 'TwicPicture' );
    this.containerClass = containerClass;
    this.rest = rest;
    this.src = src;
  }
};
</script>
