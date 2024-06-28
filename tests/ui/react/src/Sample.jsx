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
    duration,
    eager,
    fetchpriority,
    focus,
    from,
    intrinsic,
    media = 'img',
    mode,
    position,
    posterFrom,
    placeholder,
    preTransform,
    ratio,
    refit,
    step,
    title,
    to,
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
      duration = { duration }
      eager={ eager }
      fetchpriority = { fetchpriority }
      focus={ focus }
      from = { from }
      intrinsic={ intrinsic }
      mode={ mode }
      position={ position }
      placeholder={ placeholder }
      posterFrom={ posterFrom }
      preTransform={ preTransform }
      ratio={ ratio }
      refit={ refit }
      step={ step }
      title={ title }
      to = { to }
      transition={ transition }
      transitionDelay={ transitionDelay }
      transitionDuration={ transitionDuration }
      transitionTimingFunction={ transitionTimingFunction }
      zoom={ zoom }
    />
  );
};

export default Sample;
