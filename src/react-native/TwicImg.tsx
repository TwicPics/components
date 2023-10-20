import React, { useState } from 'react';
import type { ImgAttributes } from './types';
import Wrapper from './Wrapper';
import Media from './Media';

const TwicImg = ( props: ImgAttributes ) => {
    const [ viewSize, setViewSize ] = useState( undefined );
    const [ visible, setVisible ] = useState( false );
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
            { viewSize && <Media { ...props } mediaTag={ `img` } viewSize={ viewSize } visible={ visible }/> }
        </Wrapper>
    );
};

export default TwicImg;
