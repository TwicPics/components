// components/Sample.jsx
import React, { useState, useEffect } from 'react';
import { TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/react";

const Sample = () => {
  const [ params, setParams ] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObj = JSON.parse(queryParams.get('params') || '{  }');
    setParams(paramsObj);
  }, []);

  const {
    src = 'football.jpg',
    media = 'img',
    ...others
  } = params;

  const TwicComponent = media === 'img' ? TwicImg : ( media === 'video' ? TwicVideo : TwicPicture );

  return (
    <TwicComponent
      src={ src }
      { ... others }
    />
  );
};

export default Sample;
