<script>
  import { onMount } from 'svelte';
  import { TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/svelte3";

  let src;
  let component;
  let rest;
  let TwicComponent;

  onMount(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');
    ( { src = 'football.jpg' , component = 'TwicImg' , ...rest }  = params );
    TwicComponent = component === 'TwicImg' ? TwicImg : (component === 'TwicVideo' ? TwicVideo : TwicPicture);
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
