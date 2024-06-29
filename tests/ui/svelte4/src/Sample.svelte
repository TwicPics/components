<script>
  import { onMount } from 'svelte';
  import { TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/svelte4";

  let src;
  let media;
  let rest;
  let TwicComponent;

  onMount(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');
    ( { src = 'football.jpg' , media = 'img' , ...rest }  = params );
    
    TwicComponent = media === 'img' ? TwicImg : (media === 'video' ? TwicVideo : TwicPicture);
  });
</script>

<main>
  {#if TwicComponent}
    <svelte:component
      this= { TwicComponent }
      src= { src }
      { ...rest }
    />
  {/if}
</main>
