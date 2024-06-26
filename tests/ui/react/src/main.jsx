import React from 'react';
import ReactDOM from 'react-dom/client';
import { installTwicpics, TwicImg, TwicVideo, TwicPicture } from "@twicpics/components/react";
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

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

ReactDOM.createRoot( document.getElementById( `root` ) ).render(
    <React.StrictMode>
      <>
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
      </>
    </React.StrictMode>
);
