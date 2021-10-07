declare const FRAMEWORK: string;

export const isWebComponents = ( FRAMEWORK === `webcomponents` );

export const isBrowser =
    isWebComponents || ( Boolean( ( typeof document !== `undefined` ) && document.createElement && document.head ) );

