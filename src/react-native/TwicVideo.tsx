import React, { useState } from 'react';
import type { VideoAttributes } from './types';
import Wrapper from './Wrapper';
import Media from './Media';
import { parseDuration, parseFrom, parseTo } from './parse';
import { preComputeVideoOptions } from '../_/preCompute';

const TwicVideo = ( props: VideoAttributes ) => {
    const [ viewSize, setViewSize ] = useState( undefined );
    const [ visible, setVisible ] = useState( false );
    const duration = parseDuration( props.duration );
    const from = parseFrom( props.from );
    const posterFrom = parseFrom( props.posterFrom );
    const to = parseTo( props.to );
    const videoOptions = preComputeVideoOptions( duration, from, posterFrom, to );
    return (
        <Wrapper
            onLayout={ _viewSize => {
                setViewSize( _viewSize );
            } }
            onVisibilityChanged={ _visible => {
                setVisible( _visible );
            } }
            ratio={ props.ratio }
            style={ props.style }
        >
            { viewSize &&
                <Media
                    { ...props }
                    mediaTag={ `video` }
                    viewSize={ viewSize }
                    videoOptions={ videoOptions }
                    visible={ visible }
                />
            }
        </Wrapper>
    );
};

export default TwicVideo;
