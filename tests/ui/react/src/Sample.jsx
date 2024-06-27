import React from 'react';
import { TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/react";
import "@twicpics/components/style.css";

const queryParams = new URLSearchParams( window.location.search );

const {
  src='football.jpg',
  alt,
  anchor,
  bot,
  eager,
  focus,
  intrinsic,
  media='img',
  mode,
  position,
  placeholder,
  preTransform,
  ratio,
  refit,
  step,
  title,
  transition,
  transitionDelay,
  transitionDuration,
  transitionTimingFunction,
  zoom
} = JSON.parse( queryParams.get( 'params' ) || '{}' );

const TwicComponent = media === `img` ? TwicImg : ( media === `video` ? TwicVideo : TwicPicture);

const Sample = () => (
  <TwicComponent
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
);

export default Sample;