import type { Attributes, StateEvent } from "../_/types";

export type onStateChangeType = ( stateEvent: StateEvent ) => void;

export interface BaseAttributes extends Attributes {
    id?: string;
    className?: string;
    draggable?: boolean | string,
    onStateChange?: onStateChangeType;
    tabindex?: number | string,
}

