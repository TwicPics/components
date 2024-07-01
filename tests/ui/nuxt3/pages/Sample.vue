<template>
  <component
    :is="TwicComponent"
    :src="src"
    v-bind="rest"
  />
</template>

<script>
export default {
  name: "Sample",
  data() {
    return {
      src: '',
      TwicComponent: 'TwicImg',
      rest: {}
    };
  },
  mounted() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');
    const { src = 'football.jpg' , component = 'TwicImg' , ...rest } = params;
    this.TwicComponent = component === 'TwicImg' ? 'TwicImg' : ( component === 'TwicVideo' ? 'TwicVideo' : 'TwicPicture' );
    this.rest = rest;
    this.src = src;
  }
};
</script>
