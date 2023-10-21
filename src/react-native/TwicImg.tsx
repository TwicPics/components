import React, { useState } from 'react';
import type { ImgAttributes } from './types';
import Wrapper from './_Wrapper';
import Media from './_Media';

const TwicImg = ( props: ImgAttributes ) => {
    const [ viewSize, setViewSize ] = useState( undefined );
    return (
        <Wrapper
            onLayout={ _viewSize => {
                setViewSize( _viewSize );
            } }
            ratio={ props.ratio }
            style={ props.style }
        >
            { viewSize && < Media { ...props } mediaTag={ `img` } viewSize={ viewSize } /> }
        </Wrapper>
    );
};

export default TwicImg;
