import type { Attributes, StateEvent } from "../_/types";

export type onStateChangeType = ( stateEvent: StateEvent ) => void;

export interface BaseAttributes extends Attributes {
    className?: string;
    onStateChange?: onStateChangeType;
}

