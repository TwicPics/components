export default ( brand = `twicpics` ) => [
    [ /\bBRAND([^:])/g, `${ JSON.stringify( brand ) }$1` ],
    [ /\b__INSTALL_FUNCTION__/g, `${ brand === `ffy` ? `installFrontify` : `installTwicpics` }` ],
    [ /\b__BACKGROUND_COMPONENT__/g, `${ brand === `ffy` ? `FfyBackground` : `TwicBackground` }` ],
    [ /\b__IMG_COMPONENT__/g, `${ brand === `ffy` ? `FfyImg` : `TwicImg` }` ],
    [ /\b__INSTALL_COMPONENT__/g, `${ brand === `ffy` ? `FfyInstall` : `TwicInstall` }` ],
    [ /\b__PICTURE_COMPONENT__/g, `${ brand === `ffy` ? `FfyPicture` : `TwicPicture` }` ],
    [ /\b__VIDEO_COMPONENT__/g, `${ brand === `ffy` ? `FfyVideo` : `TwicVideo` }` ],
    [ /\b__VIEW_COMPONENT__/g, `${ brand === `ffy` ? `FfyView` : `TwicView` }` ],
];
