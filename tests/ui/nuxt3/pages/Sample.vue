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
const componentMap = new Map( [
    [ 'TwicImg', 'TwicImg' ],
    [ 'TwicVideo', 'TwicVideo' ],
    [ 'TwicPicture', 'TwicPicture' ]
] );

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
    this.TwicComponent = componentMap.get( component ) || 'TwicImg';
    this.containerClass = containerClass;
    this.rest = rest;
    this.src = src;
  }
};
</script>
