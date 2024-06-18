import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-duplicate-imports
import type { ReactNode, FC } from 'react';
// eslint-disable-next-line no-shadow
import { View, Dimensions } from 'react-native';
import { config } from '../_/config';

export interface Props {
  children: ReactNode;
  eager?: boolean,
  onVisibilityChanged( visible: boolean ): unknown;
}

const MEASUREMENT_INTERVAL = 100;

const VisibilityDetector: FC<Props> = (
    { eager, children, onVisibilityChanged }
) => {
    const { anticipation } = config;
    const detector = useRef< View >( null );
    const timeout = useRef< ReturnType< typeof setTimeout > >( null );
    const observe = () => {
        if ( !detector?.current ) {
            return;
        }
        const viewport = Dimensions.get( `window` );
        // eslint-disable-next-line max-params
        detector.current.measure( ( _, __, width, height, pageX, pageY ) => {
            if ( height === 0 ) {
                return;
            }
            const mediaBox = {
                "top": pageY,
                "bottom": pageY + height,
                "right": pageX + width,
                "left": pageX,
            };
            const viewportBox = {
                "top": anticipation * viewport.height * -1,
                "bottom": viewport.height * ( 1 + anticipation ),
                "left": anticipation * viewport.width * -1,
                "right": viewport.width * ( 1 + anticipation ),
            };
            if (
                ( mediaBox.bottom >= viewportBox.top ) &&
                ( mediaBox.top <= viewportBox.bottom ) &&
                ( mediaBox.right >= viewportBox.left ) &&
                ( mediaBox.left <= viewportBox.right )
            ) {
                onVisibilityChanged( true );
                return;
            }
            timeout.current = setTimeout( () => {
                observe();
            }, MEASUREMENT_INTERVAL );
        } );
    };

    const unobserve = () => {
        if ( timeout?.current ) {
            clearTimeout( timeout.current );
            timeout.current = null;
        }
    };

    // eslint-disable-next-line consistent-return
    useEffect( () => {
        if ( eager ) {
            onVisibilityChanged( true );
        } else {
            observe();
            return unobserve;
        }
    }, [] );

    return (
        <View
            collapsable={false}
            ref={ detector }
            style={ {
                "flex": 1,
            }
            }>
            { children }
        </View>
    );
};

export default VisibilityDetector;
