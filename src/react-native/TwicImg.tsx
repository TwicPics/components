/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/display-name */
import React, { Component, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-shadow
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
// eslint-disable-next-line no-duplicate-imports
import type { LayoutChangeEvent } from 'react-native';

import {
    parseAlt,
    parseAnchor,
    parseFocus,
    parseMode,
    parsePlaceholder,
    parsePreTransform,
    parseRatio,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from './parse';

import {
    computeAlt,
    computeContainerStyle,
    computePosition,
    computeTimingConfig,
    computeUrls,
    computeViewSize,
    computeWidth,
} from './compute';
import type { Attributes, MediaAttributes, WrapperState } from './types';
import { getMediaData } from './mediaInfos';
import { debounce } from '../_/utils';

const TwicMedia = React.memo( ( props: MediaAttributes ) => {
    const { viewSize } = props;
    const alt = parseAlt( props.alt );
    const anchor = parseAnchor( props.anchor );
    // eslint-disable-next-line no-shadow
    const focus = parseFocus( props.focus );
    const mode = parseMode( props.mode ) || `cover`;
    const placeholder = parsePlaceholder( props.placeholder, props.src );
    const preTransform = parsePreTransform( props.preTransform );
    const src = parseSrc( props.src );
    const step = parseStep( props.step );
    const transition = parseTransition( props.transition );
    const transitionDelay = parseTransitionDelay( props.transitionDelay );
    const transitionDuration = parseTransitionDuration( props.transitionDuration );
    const transitionTimingFunction = parseTransitionTimingFunction( props.transitionTimingFunction );
    const computedAlt = computeAlt( alt, src );
    const { media, lqip } = computeUrls( {
        anchor,
        focus,
        mode,
        placeholder,
        preTransform,
        src,
        step,
        viewSize,
    } );

    const _getMediaData = useRef( debounce( async ( _media, _lqip, _viewSize ) => {
        const _mediaData = await getMediaData( _media, _lqip, _viewSize );
        setMediaData( _mediaData );
    }, {
        "leading": false,
        "ms": 100,
    } ) ).current;
    const opacityTransition = useRef( new Animated.Value( 0 ) );
    const scaleTransition = useRef( new Animated.Value( transition.hasOwnProperty( `zoom` ) ? 0 : 1 ) );
    const [ mediaData, setMediaData ] = useState( undefined );

    useEffect( () => {
        // eslint-disable-next-line no-nested-ternary
        opacityTransition.current.setValue( transition.hasOwnProperty( `fade` ) ? 1 : 0 );
        _getMediaData( media, lqip, viewSize );
    }, [ media, lqip ] );

    const onImage = () => {
        if ( transition.hasOwnProperty( `none` ) ) {
            opacityTransition.current.setValue( 0 );
        } else {
            Animated.timing(
                opacityTransition.current,
                computeTimingConfig( 0, transitionDelay, transitionDuration, transitionTimingFunction )
            ).start();
            Animated.timing(
                scaleTransition.current,
                computeTimingConfig( 1, transitionDelay, transitionDuration, transitionTimingFunction )
            ).start();
        }
    };
    return (
        <Animated.View style={ [
            styles.layout,
            computePosition( anchor, mode ),
            {
                "transform": [
                    {
                        "scale": scaleTransition.current,
                    },
                ],
            },
        ] }>
            <ImageBackground
                accessibilityLabel={computedAlt}
                onLoad={onImage}
                source={
                    {
                        "uri": mediaData?.src,
                    }
                }
                style=
                    {
                        {
                            "aspectRatio": mediaData?.ratioIntrinsic,
                            "width": computeWidth( mediaData, viewSize ),
                        }
                    }
            >
                { mediaData?.placeholder &&
                    (
                        <Animated.Image
                            accessibilityLabel={`${ computedAlt }-placeholder`}
                            blurRadius={ mediaData.placeholder.blurRadius || 0}
                            source=
                                {
                                    {
                                        "uri": mediaData.placeholder.uri,
                                    }
                                }
                            style=
                                {[
                                    styles.placeholder,
                                    {
                                        "backgroundColor": mediaData.placeholder.color,
                                        "opacity": opacityTransition.current,
                                    },
                                ]}
                        />
                    )
                }
            </ImageBackground>
        </Animated.View>
    );
} );

export default class TwicImg extends Component<Attributes, WrapperState> {
    constructor( props: Attributes ) {
        super( props );
        this.state = {
            "viewSize": undefined,
            "ready": false,
        };
    }
    render() {
        const { props } = this;
        const ratio = parseRatio( props.ratio || 1 );
        return (
            <View
                style={
                    StyleSheet.flatten(
                        [ styles.container, computeContainerStyle( props.style, ratio ) ]
                    )
                }
                onLayout= {
                    // eslint-disable-next-line no-shadow
                    ( event: LayoutChangeEvent ) => {
                        const { width, height } = event.nativeEvent.layout;
                        this.setState(
                            {
                                "viewSize": computeViewSize( width, height, ratio ),
                                "ready": ( width > 0 ) && ( height > 0 ),
                            }
                        );
                    }
                }
            >
                {
                    ( this.state.ready ) ?
                        <TwicMedia {...props} viewSize={this.state.viewSize} /> :
                        undefined
                }
            </View>
        );
    }
}

const styles = StyleSheet.create( {
    "container": {
        "overflow": `hidden`,
        "width": `100%`,
    },
    "layout": {
        "flex": 1,
        "flexDirection": `column`,
        "overflow": `hidden`,
    },
    "placeholder": {
        "height": `100%`,
        "width": `100%`,
    },
    "wrapper": {
        "overflow": `hidden`,
        "width": `100%`,
        "height": `100%`,
    },
} );
