import type * as React from 'react';
import type { EasingFunction } from "react-native";
import type { AnchorObject, Mode, Placeholder } from "../_/types";

export interface Attributes {
    alt?: string,
    anchor?: string,
    eager?: boolean,
    focus?: string,
    mode?: Mode,
    placeholder?: Placeholder,
    preTransform?: string,
    ratio?: number | string,
    refit: boolean | string,
    step?: number | string,
    style?: Record< string, string | number >,
    src: string,
    transition?: boolean | string,
    transitionDelay?: string,
    transitionDuration?: string,
    transitionTimingFunction?: EasingFunction,
}

export type MediaTag = `img` | `video`;

export interface MediaAttributes extends Attributes {
    mediaTag: MediaTag,
    viewSize: SizeObject,
    visible?: boolean,
}

export interface WrapperAttributes {
    onLayout: ( ( viewSize: SizeObject ) => void ) ;
    onVisibilityChanged: ( ( visible: boolean ) => void );
    eager?: boolean,
    ratio?: number | string,
    style?: Record< string, string | number >,
    children: React.ReactNode,
}

export interface IMediaInfos {
    placeholder?: PlaceholderData,
    height: number,
    width: number,
}

export interface MediaInfos {
    placeholder?: PlaceholderData,
    ratioIntrinsic: number,
}

export interface PlaceholderData {
    blurRadius: number,
    color: string,
    offset: number,
    uri: string,
}

export interface TimingConfig {
  toValue: number,
  transitionDelay: string,
  transitionDuration: string,
  transitionTimingFunction: EasingFunction,
}

export interface SizeObject {
    height: number,
    width: number,
    ratio?: number,
}

export interface UrlData {
    anchor: AnchorObject,
    focus: string,
    inspect?: boolean,
    mode: Mode,
    placeholder: Placeholder,
    preTransform: string,
    refit?: string,
    src: string,
    step: number,
    viewSize: SizeObject
}
