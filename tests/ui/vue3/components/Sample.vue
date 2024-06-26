<template>
  <component
    :is="TwicComponent"
    :src="src"
    :alt="alt"
    :anchor="anchor"
    :bot="bot"
    :eager="eager"
    :focus="focus"
    :intrinsic="intrinsic"
    :mode="mode"
    :position="position"
    :placeholder="placeholder"
    :pre-transform="preTransform"
    :ratio="ratio"
    :refit="refit"
    :step="step"
    :title="title"
    :transition="transition"
    :transition-delay="transitionDelay"
    :transition-duration="transitionDuration"
    :transition-timing-function="transitionTimingFunction"
    :zoom="zoom"
  />
</template>

<script>

export default {
  name: "Sample",
  data() {
    return {
      src: 'football.jpg',
      alt: undefined,
      anchor: undefined,
      bot: undefined,
      eager: undefined,
      focus: undefined,
      intrinsic: undefined,
      media: 'img',
      mode: undefined,
      position: undefined,
      placeholder: undefined,
      preTransform: undefined,
      ratio: undefined,
      refit: undefined,
      step: undefined,
      title: undefined,
      transition: undefined,
      transitionDelay: undefined,
      transitionDuration: undefined,
      transitionTimingFunction: undefined,
      zoom: undefined,
      TwicComponent: 'TwicImg'
    };
  },
  mounted() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');

    this.src = params.src || this.src;
    this.alt = params.alt || undefined;
    this.anchor = params.anchor || undefined;
    this.bot = params.bot || undefined;
    this.eager = params.eager || undefined;
    this.focus = params.focus || undefined;
    this.intrinsic = params.intrinsic || undefined;
    this.media = params.media || this.media;
    this.mode = params.mode || undefined;
    this.position = params.position || undefined;
    this.placeholder = params.placeholder || undefined;
    this.preTransform = params.preTransform || undefined;
    this.ratio = params.ratio || undefined;
    this.refit = params.refit || undefined;
    this.step = params.step || undefined;
    this.title = params.title || undefined;
    this.transition = params.transition || undefined;
    this.transitionDelay = params.transitionDelay || undefined;
    this.transitionDuration = params.transitionDuration || undefined;
    this.transitionTimingFunction = params.transitionTimingFunction || undefined;
    this.zoom = params.zoom || undefined;

    this.TwicComponent = this.media === 'img' ? 'TwicImg' : (this.media === 'video' ? 'TwicVideo' : 'TwicPicture');
  }
};
</script>

