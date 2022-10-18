export * from "../_/parse";
import { Easing, type EasingFunction } from "react-native";
// eslint-disable-next-line id-length
export const parseTransitionTimingFunction = ( value: EasingFunction ): EasingFunction => value || Easing.ease;
