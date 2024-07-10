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
    containerClass= 'default',
    component = 'TwicImg',
    ...others
  } = params;

  const componentMap = new Map( [
      [ 'TwicImg', TwicImg ],
      [ 'TwicVideo', TwicVideo ],
      [ 'TwicPicture', TwicPicture ],
  ] );

  const TwicComponent = componentMap.get( component ) || TwicImg;

  return (
    <div className={ containerClass }>
        <TwicComponent
          src={ src }
          { ... others }
        />
    </div>
  );
};

export default Sample;
