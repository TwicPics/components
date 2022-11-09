import type { EasingFunction } from "react-native";
import type { AnchorObject, Mode, Placeholder } from "../_/types";

export interface Attributes {
    alt?: string,
    anchor?: string,
    focus?: string,
    mode?: Mode,
    placeholder?: Placeholder,
    preTransform?: string,
    ratio?: number | string,
    step?: number | string,
    style?: Record< string, string | number >,
    src: string,
    transition?: boolean | string,
    transitionDelay?: string,
    transitionDuration?: string,
    transitionTimingFunction?: EasingFunction,
}

export interface IMediaData {
    placeholder?: PlaceholderData,
    width: number,
    height: number
}

export interface MediaAttributes extends Attributes {
    viewSize: SizeObject
}

export interface MediaData {
    placeholder?: PlaceholderData,
    ratioIntrinsic: number,
    src: string,
}

export interface PlaceholderData {
    blurRadius: number,
    color: string,
    uri: string,
}

export interface SizeObject {
    height: number,
    width: number,
    ratio?: number,
}

export interface UrlData {
    anchor: AnchorObject,
    focus: string,
    lqip?:boolean,
    mode: Mode,
    placeholder: Placeholder,
    preTransform: string,
    src: string,
    step: number,
    viewSize: SizeObject
}

export interface WrapperState {
    viewSize: SizeObject,
    ready: boolean,
}
