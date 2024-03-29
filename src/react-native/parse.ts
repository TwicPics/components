export * from "../_/parse";
import { Easing, type EasingFunction } from "react-native";
import { regExpFinderFactory, trimRegExpFactory } from "../_/utils";
import type { CachePolicy } from "../_/types";

const validCachePolicy: Array< CachePolicy > = [ `disk`, `memory`, `memory-disk`, `none` ];
export const rValidCachePolicy = trimRegExpFactory( validCachePolicy );
export const parseCachePolicy = regExpFinderFactory< CachePolicy >( rValidCachePolicy );

// eslint-disable-next-line id-length
export const parseTransitionTimingFunction = ( value: EasingFunction ): EasingFunction => value || Easing.ease;
