import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-duplicate-imports
import type { ReactNode, FC } from 'react';
// eslint-disable-next-line no-shadow
import { View, Dimensions } from 'react-native';
import { config } from '../_/config';

type OnVisibilityChanged = ( visible: boolean ) => void;
type ViewportBox = {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

interface VisibilityDetectorProps {
    children: ReactNode;
    eager?: boolean,
    onVisibilityChanged: OnVisibilityChanged;
}

const MAX_IMMEDIATE_DETECTION = 20;
const MEASUREMENT_INTERVAL = 100;

const visibilityDetectors = new Map< View, OnVisibilityChanged>();

let timeoutId: ReturnType<typeof setTimeout> | null = null;

let isObserving = false;

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

let viewportBox: ViewportBox;

Dimensions.addEventListener( `change`, () => {
    viewportBox = computeViewportBox();
} );

const observe = () => {
    if ( isObserving && ( visibilityDetectors.size > MAX_IMMEDIATE_DETECTION ) ) {
        return;
    }
    isObserving = true;

    const measurementPromises: Promise<void>[] = [];

    if ( !viewportBox ) {
        viewportBox = computeViewportBox();
    }

    visibilityDetectors.forEach( ( onVisibilityChanged, visibilityDetector ) => {
        const measurePromise = new Promise< void >( resolve => {
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
                    onVisibilityChanged( true );
                    visibilityDetectors.delete( visibilityDetector );
                }

                resolve();
            } );
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

const unobserve = () => {
    if ( ( visibilityDetectors.size === 0 ) && timeoutId ) {
        clearTimeout( timeoutId );
        timeoutId = null;
    }
};

const VisibilityDetector: FC< VisibilityDetectorProps > = (
    { eager, children, onVisibilityChanged }
) => {

    const detector = useRef< View >( null );
    const detectorKeyRef = useRef<View | null>( null );

    // eslint-disable-next-line consistent-return
    useEffect( () => {
        if ( !eager ) {
            detectorKeyRef.current = detector.current;
            visibilityDetectors.set( detectorKeyRef.current, onVisibilityChanged );
            observe();
            return () => {
                visibilityDetectors.delete( detectorKeyRef.current );
                unobserve();
            };
        }
    }, [ eager ] );

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
