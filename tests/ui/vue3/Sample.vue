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
      src: 'football.jpg',
      media: 'img',
      TwicComponent: 'TwicImg',
      rest: {}
    };
  },
  mounted() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');

    this.src = params.src || this.src;
    this.media = params.media || this.media;
    this.TwicComponent = this.media === 'img' ? 'TwicImg' : (this.media === 'video' ? 'TwicVideo' : 'TwicPicture');

    // Remove 'src' and 'media' from params and set otherParams
    const { src, media, ...rest } = params;
    this.rest = rest;
  }
};
</script>
