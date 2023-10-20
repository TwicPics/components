import type * as React from 'react';
import type { EasingFunction } from "react-native";
import type { AnchorObject, Mode, Placeholder, VideoOptions } from "../_/types";

export interface BaseAttributes {
    alt?: string,
    anchor?: string,
    eager?: boolean,
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

export interface ImgAttributes extends BaseAttributes {
    refit: boolean | string,
}

export interface VideoAttributes extends BaseAttributes {
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}

export type MediaTag = `img` | `video`;

export interface MediaAttributes extends BaseAttributes {
    mediaTag: string,
    refit?: boolean | string,
    videoOptions?: VideoOptions,
    visible?: boolean,
    viewSize: SizeObject,
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
