import { config } from "./config";
import type { BreakPoint } from "./types";

export const VERSION = `v1`;

export const Resolutions = [ `xs`, `sm`, `md`, `lg`, `xl`, `2xl` ]
    .map( r => config.breakpoints[ r as BreakPoint ] )
    .sort( ( a, b ) => a - b );

export const ResolutionMax = Resolutions[ Resolutions.length - 1 ];
