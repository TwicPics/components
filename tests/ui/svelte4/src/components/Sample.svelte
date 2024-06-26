<script>
  import { onMount } from 'svelte';
  import { TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/svelte4";
  import "@twicpics/components/style.css";

  let src = 'football.jpg';
  let alt;
  let anchor;
  let bot;
  let eager;
  let focus;
  let intrinsic;
  let media = 'img';
  let mode;
  let position;
  let placeholder;
  let preTransform;
  let ratio;
  let refit;
  let step;
  let title;
  let transition;
  let transitionDelay;
  let transitionDuration;
  let transitionTimingFunction;
  let zoom;
  let TwicComponent;

  
  onMount(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');
    src = params.src || src;
    alt = params.alt;
    anchor = params.anchor;
    bot = params.bot;
    eager = params.eager;
    focus = params.focus;
    intrinsic = params.intrinsic;
    media = params.media || media;
    mode = params.mode;
    position = params.position;
    placeholder = params.placeholder;
    preTransform = params.preTransform;
    ratio = params.ratio;
    refit = params.refit;
    step = params.step;
    title = params.title;
    transition = params.transition;
    transitionDelay = params.transitionDelay;
    transitionDuration = params.transitionDuration;
    transitionTimingFunction = params.transitionTimingFunction;
    zoom = params.zoom;

    TwicComponent = media === 'img' ? TwicImg : (media === 'video' ? TwicVideo : TwicPicture);
  })
</script>

<main>
  {#if TwicComponent}
    <svelte:component
      this={ TwicComponent }
      src={ src }
      alt={ alt }
      anchor={ anchor }
      bot={ bot }
      eager={ eager }
      focus={ focus }
      intrinsic={ intrinsic }
      mode={ mode }
      position={ position }
      placeholder={ placeholder }
      preTransform={ preTransform }
      ratio={ ratio }
      refit={ refit }
      step={ step }
      title={ title }
      transition={ transition }
      transitionDelay={ transitionDelay }
      transitionDuration={ transitionDuration }
      transitionTimingFunction={ transitionTimingFunction }
      zoom={ zoom }
    />
  {/if}
</main>