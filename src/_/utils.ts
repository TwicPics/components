declare const FRAMEWORK: string;

export const isWebComponent = ( FRAMEWORK === `webcomponent` );

export const isBrowser =
    isWebComponent || ( Boolean( ( typeof document !== `undefined` ) && document.createElement && document.head ) );

