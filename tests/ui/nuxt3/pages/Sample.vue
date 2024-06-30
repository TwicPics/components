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
    const { src = 'football.jpg' , media = 'img' , ...rest } = params;
    this.TwicComponent = media === 'img' ? 'TwicImg' : ( media === 'video' ? 'TwicVideo' : 'TwicPicture' );
    this.rest = rest;
    this.src = src;
  }
};
</script>
