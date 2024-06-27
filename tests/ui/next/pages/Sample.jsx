// components/Sample.jsx
import React, { useState, useEffect } from 'react';
import { TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/react";
import "@twicpics/components/style.css";

const Sample = () => {
  const [ params, setParams ] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObj = JSON.parse(queryParams.get('params') || '{  }');
    setParams(paramsObj);
  }, []);

  const {
    src = 'football.jpg',
    alt,
    anchor,
    bot,
    eager,
    focus,
    intrinsic,
    media = 'img',
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
  } = params;

  const TwicComponent = media === 'img' ? TwicImg : ( media === 'video' ? TwicVideo : TwicPicture );

  return (
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
};

export default Sample;
