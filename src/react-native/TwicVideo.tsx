import React, { useState } from 'react';
import type { VideoAttributes } from './types';
import Wrapper from './_Wrapper';
import Media from './_Media';
import { parseDuration, parseFrom, parseTo } from './parse';
import { preComputeVideoOptions } from '../_/preCompute';

const TwicVideo = ( props: VideoAttributes ) => {
    const [ viewSize, setViewSize ] = useState( undefined );
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
            ratio={ props.ratio }
            style={ props.style }
        >
            { viewSize &&
                <Media
                    { ...props }
                    mediaTag={ `video` }
                    viewSize={ viewSize }
                    videoOptions={ videoOptions }
                />
            }
        </Wrapper>
    );
};

export default TwicVideo;
