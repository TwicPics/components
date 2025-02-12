import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-duplicate-imports
import type { ReactNode, FC } from 'react';
// eslint-disable-next-line no-shadow
import { View, Dimensions } from 'react-native';
import { config } from '../_/config';

type OnVisibilityChanged = ( visible: boolean ) => void;
export interface Props {
  children: ReactNode;
  eager?: boolean,
  onVisibilityChanged: OnVisibilityChanged;
}

const MEASUREMENT_INTERVAL = 100;

const visibilityDetectors = new Map< View, OnVisibilityChanged>();

let timeoutId: ReturnType<typeof setTimeout> | null = null;

let isMeasuring = false;

const measure = () => {
    if ( isMeasuring ) {
        return;
    }
    isMeasuring = true;

    const viewport = Dimensions.get( `window` );
    const { anticipation } = config;

    const viewportBox = {
        "top": anticipation * viewport.height * -1,
        "bottom": viewport.height * ( 1 + anticipation ),
        "left": anticipation * viewport.width * -1,
        "right": viewport.width * ( 1 + anticipation ),
    };

    const detectorsToRemove: View[] = [];

    const measurementPromises: Promise<void>[] = [];

    visibilityDetectors.forEach( ( onVisibilityChanged, visibilityDetector ) => {
        const measurePromise = new Promise<void>( resolve => {
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
                    detectorsToRemove.push( visibilityDetector );
                }

                resolve();
            } );
        } );

        measurementPromises.push( measurePromise );
    } );

    Promise.all( measurementPromises ).then( () => {
        detectorsToRemove.forEach( visibilityDetector => visibilityDetectors.delete( visibilityDetector ) );
        isMeasuring = false;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        observe();
    } );
};

const unobserve = () => {
    if ( ( visibilityDetectors.size === 0 ) && timeoutId ) {
        clearTimeout( timeoutId );
        timeoutId = null;
    }
};

const observe = () => {
    if ( timeoutId || ( visibilityDetectors.size === 0 ) ) {
        return;
    }

    timeoutId = setTimeout(
        () => {
            measure();
            timeoutId = null;
        },
        MEASUREMENT_INTERVAL
    );
};

const VisibilityDetector: FC<Props> = (
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
