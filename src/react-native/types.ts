import type * as React from 'react';
import type { EasingFunction } from "react-native";
import type {
    AnchorObject,
    CachePolicy,
    CrossOrigin,
    Mode,
    Options as BaseOptions,
    Placeholder,
    ReferrerPolicy,
    VideoOptions,
} from "../_/types";

export type MediaTag = `img` | `video`;

export interface AssetAttributes {
  alt?: string,
  cachePolicy?: CachePolicy,
  crossOrigin?: CrossOrigin,
  onLoad: ( ( ) => void ) ;
  poster?: string,
  referrerPolicy?: ReferrerPolicy,
  uri: string,
}
export interface BaseAttributes {
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
    alt?: string,
    cachePolicy?: CachePolicy,
    crossOrigin?: CrossOrigin;
    referrerPolicy?: ReferrerPolicy,
    refit?: boolean | string,
}

export interface Options extends BaseOptions {
    cachePolicy? : CachePolicy,
}

export interface VideoAttributes extends BaseAttributes {
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}

export interface MediaAttributes extends BaseAttributes {
    alt?: string,
    cachePolicy? : CachePolicy,
    crossOrigin?: CrossOrigin,
    mediaTag: MediaTag,
    referrerPolicy?: ReferrerPolicy,
    refit?: boolean | string,
    videoOptions?: VideoOptions,
    viewSize: SizeObject,
}

export interface WrapperAttributes {
    onLayout: ( ( viewSize: SizeObject ) => void ) ;
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
    poster?: boolean,
    preTransform: string,
    refit?: string,
    src: string,
    step: number,
    videoOptions?: VideoOptions,
    viewSize: SizeObject
}
