import type { AssetAttributes } from "./types";

export const isSameAsset = (
    prevProps: AssetAttributes,
    nextProps: AssetAttributes
) => prevProps.uri === nextProps.uri;

