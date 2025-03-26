export const replacersConfiguration = ( { brand = `twicpics`, isSvelteKit = false } ) => [
    ...[
        [ /\b__BACKGROUND_COMPONENT__/g, `${ brand === `ffy` ? `FfyBackground` : `TwicBackground` }` ],
        [ /\b__IMG_COMPONENT__/g, `${ brand === `ffy` ? `FfyImg` : `TwicImg` }` ],
        [ /\b__INSTALL_COMPONENT__/g, `${ brand === `ffy` ? `FfyInstall` : `TwicInstall` }` ],
        [ /\b__INSTALL_FUNCTION__/g, `${ brand === `ffy` ? `installFrontify` : `installTwicpics` }` ],
        [ /\b__NG_MODULE__/g, `${ brand === `ffy` ? `FfyComponentsModule` : `TwicPicsComponentsModule` }` ],
        [ /\b__PICTURE_COMPONENT__/g, `${ brand === `ffy` ? `FfyPicture` : `TwicPicture` }` ],
        [ /\b__VIDEO_COMPONENT__/g, `${ brand === `ffy` ? `FfyVideo` : `TwicVideo` }` ],
        [ /\b__VIEW_COMPONENT__/g, `${ brand === `ffy` ? `FfyView` : `TwicView` }` ],
        [ /\bBRAND[^:]/g, `'${ brand }'` ],
    ],
    ...isSvelteKit ? [
        [ /\bTwicBackground\.svelte/, `${ brand === `ffy` ? `FfyBackground.svelte` : `TwicBackground.svelte` }` ],
        [ /\bTwicImg\.svelte/, `${ brand === `ffy` ? `FfyImg.svelte` : `TwicImg.svelte` }` ],
        [ /\bTwicBackground\.svelte/, `${ brand === `ffy` ? `FfyBackground.svelte` : `TwicBackground.svelte` }` ],
        [ /\bTwicPicture\.svelte/, `${ brand === `ffy` ? `FfyPicture.svelte` : `TwicPicture.svelte` }` ],
        [ /\bTwicVideo\.svelte/, `${ brand === `ffy` ? `FfyVideo.svelte` : `TwicVideo.svelte` }` ],
        [ /\bTwicView\.svelte/, `${ brand === `ffy` ? `FfyView.svelte` : `TwicView.svelte` }` ],
    ] : [],
];
