<script context="module">
  import { onMount } from 'svelte';
  import { TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/svelte4";
  const componentMap = new Map( [
      [ 'TwicImg', TwicImg ],
      [ 'TwicVideo', TwicVideo ],
      [ 'TwicPicture', TwicPicture ]
  ] );
</script>
<script>
  let src;
  let containerClass;
  let component;
  let rest;
  let TwicComponent;

  onMount(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params = JSON.parse(queryParams.get('params') || '{}');
    ( { src = 'football.jpg' , component = 'TwicImg' , containerClass= 'default', ...rest }  = params );
    TwicComponent = componentMap.get( component ) || TwicImg;
  });
</script>

<main>
  {#if TwicComponent}
    <div class="{ containerClass }">
        <svelte:component
          this= { TwicComponent }
          src= { src }
          { ...rest }
        />
    </div>
  {/if}
</main>

