import type { Mode, Placeholder, TwicMode } from "./types";
import { trimRegExpFactory } from "./utils";

export const validModes: Array< Mode > = [ `contain`, `cover` ];
export const rValidMode = trimRegExpFactory( validModes );

export const validPlaceholders: Array< Placeholder > = [ `maincolor`, `meancolor`, `none`, `preview` ];
export const rValidPlaceholder = trimRegExpFactory( validPlaceholders );

export const rValidRatio = trimRegExpFactory( `(\\d+(?:\\.\\d+)?)(?:\\s*\\/\\s*(\\d+(?:\\.\\d+)?))?` );

export const validTwicMode: Array< TwicMode > = [ `debug`, `offline`, `production` ];
export const rValidTwicMode = trimRegExpFactory( validTwicMode );
