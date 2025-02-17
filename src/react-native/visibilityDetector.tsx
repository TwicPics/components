import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-duplicate-imports
import type { ReactNode, FC } from 'react';
// eslint-disable-next-line no-shadow
import { View, Dimensions } from 'react-native';

import { config } from '../_/config';
import { debounce } from '../_/utils';

type OnVisibilityChanged = () => void;
type ViewportBox = {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

interface VisibilityDetectorProps {
    children: ReactNode;
    eager?: boolean,
    isInCache: boolean,
    onVisibilityChanged: OnVisibilityChanged;
}

const MAX_IMMEDIATE_DETECTION = 20;
const MEASUREMENT_INTERVAL = 100;

const visibilityDetectors = new Map< View, OnVisibilityChanged>();

let isObserving = false;

let timeoutId: ReturnType<typeof setTimeout> | null = null;

let viewportBox: ViewportBox;

let viewportChangeListener: ReturnType< typeof Dimensions.addEventListener > | null = null;

const computeViewportBox = (): ViewportBox => {
    const viewport = Dimensions.get( `window` );
    const { anticipation } = config;

    return {
        "top": anticipation * viewport.height * -1,
        "bottom": viewport.height * ( 1 + anticipation ),
        "left": anticipation * viewport.width * -1,
        "right": viewport.width * ( 1 + anticipation ),
    };
};

const removeViewPortListener = () => {
    viewportChangeListener?.remove();
    viewportChangeListener = null;
};

const setupViewportListener = () => {
    removeViewPortListener();
    viewportBox = computeViewportBox();
    viewportChangeListener = Dimensions.addEventListener(
        `change`,
        debounce(
            () => {
                viewportBox = computeViewportBox();
            }, {

                "leading": true,
                "ms": 100,
                "trailing": false,
            }
        )
    );
};

const unobserve = ( visibilityDetector: View ) => {
    if ( visibilityDetector ) {
        visibilityDetectors.delete( visibilityDetector );
    }
    if ( visibilityDetectors.size === 0 ) {
        if ( timeoutId ) {
            clearTimeout( timeoutId );
            timeoutId = null;
        }

        removeViewPortListener();
    }
};

const observe = () => {
    if (
        ( visibilityDetectors.size === 0 ) ||
        ( isObserving && ( visibilityDetectors.size > MAX_IMMEDIATE_DETECTION ) )
    ) {
        return;
    }

    isObserving = true;

    if ( !viewportChangeListener ) {
        setupViewportListener();
    }

    const measurementPromises: Promise<void>[] = [];
    const detectorsSnapshot = new Map( visibilityDetectors );

    detectorsSnapshot.forEach( ( onVisibilityChanged, visibilityDetector ) => {
        const measurePromise = new Promise< void >( resolve => {
            try {
                // eslint-disable-next-line max-params, consistent-return
                visibilityDetector.measure( ( _, __, width, height, pageX, pageY ) => {
                    if ( height === 0 ) {
                        return resolve();
                    }

                    const mediaBox = {
                        "top": pageY,
                        "bottom": pageY + height,
                        "right": pageX + width,
                        "left": pageX,
                    };

                    const isVisible =
                        ( mediaBox.bottom >= viewportBox.top ) &&
                        ( mediaBox.top <= viewportBox.bottom ) &&
                        ( mediaBox.right >= viewportBox.left ) &&
                        ( mediaBox.left <= viewportBox.right );

                    if ( isVisible ) {
                        onVisibilityChanged();
                        unobserve( visibilityDetector );
                    }

                    resolve();
                } );
            } catch {
                resolve();
            }
        } );

        measurementPromises.push( measurePromise );
    } );

    Promise.all( measurementPromises ).then( () => {
        isObserving = false;
        if ( visibilityDetectors.size > 0 ) {
            timeoutId = setTimeout(
                () => {
                    observe();
                    timeoutId = null;
                },
                MEASUREMENT_INTERVAL
            );
        }
    } );
};

const VisibilityDetector: FC< VisibilityDetectorProps > = (
    { eager, children, isInCache, onVisibilityChanged }
) => {

    const detector = useRef< View >( null );
    const detectorKeyRef = useRef<View | null>( null );

    // eslint-disable-next-line consistent-return
    useEffect( () => {
        if ( !eager && !isInCache ) {
            detectorKeyRef.current = detector.current;
            visibilityDetectors.set( detectorKeyRef.current, onVisibilityChanged );
            observe();
        }

        if ( isInCache ) {
            onVisibilityChanged();
            unobserve( detector.current );
        }

        return () => {
            unobserve( detectorKeyRef?.current );
        };
    }, [ eager, isInCache ] );

    return (
        <View
            collapsable={false}
            ref={ detector }
            style={ {
                "flex": 1,
            } }>
            { children }
        </View>
    );
};

export default VisibilityDetector;
