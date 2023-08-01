/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/display-name */
import React, { Component, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-shadow
import { Animated, StyleSheet, View } from 'react-native';
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
    parseRefit,
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
import { getMediaInfos } from './mediaInfos';
import { debounce } from '../_/utils';

const TwicMedia = React.memo( ( props: MediaAttributes ) => {
    const { viewSize } = props;
    const alt = parseAlt( props.alt );
    const anchor = parseAnchor( props.anchor );
    // eslint-disable-next-line no-shadow
    const focus = parseFocus( props.focus );
    const mode = parseMode( props.mode ) || `cover`;
    const placeholder = parsePlaceholder( props.placeholder );
    const preTransform = parsePreTransform( props.preTransform );
    const refit = parseRefit( props.refit );
    const src = parseSrc( props.src );
    const step = parseStep( props.step );
    const transition = parseTransition( props.transition );
    const transitionDelay = parseTransitionDelay( props.transitionDelay );
    const transitionDuration = parseTransitionDuration( props.transitionDuration );
    const transitionTimingFunction = parseTransitionTimingFunction( props.transitionTimingFunction );
    const computedAlt = computeAlt( alt, src, `img` );
    const { media, inspect } = computeUrls( {
        anchor,
        focus,
        mode,
        placeholder,
        preTransform,
        refit,
        src,
        step,
        viewSize,
    } );

    const _fetch = useRef(
        debounce(
            async _media => {
                const res = await fetch( _media );
                opacityTransition.current.setValue( transition.hasOwnProperty( `fade` ) ? 1 : 0 );
                if ( res.ok ) {
                    setActualUri( URL.createObjectURL( await res.blob() ) );
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
                }
            },
            {
                "leading": false,
                "ms": 100,
            }
        )
    ).current;

    const opacityTransition = useRef( new Animated.Value( 0 ) );
    const scaleTransition = useRef( new Animated.Value( transition.hasOwnProperty( `zoom` ) ? 0 : 1 ) );
    const [ mediaInfos, setMediaInfos ] = useState( undefined );
    const [ actualUri, setActualUri ] = useState( undefined );

    useEffect( () => {
        (
            async () => {
                opacityTransition.current.setValue( transition.hasOwnProperty( `fade` ) ? 1 : 0 );
                setMediaInfos( await getMediaInfos( inspect, viewSize ) );
            }
        )();
    }, [ inspect ] );

    useEffect( () => {
        _fetch( media );
    }, [ media ] );

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
            <View style={ {
                "aspectRatio": mediaInfos?.ratioIntrinsic,
                "overflow": `hidden`,
                "width": computeWidth( mediaInfos, viewSize ),
            } }>
                { actualUri && (
                    <Animated.Image
                        accessibilityLabel={computedAlt}
                        style={ [ styles.media ] }
                        source={ {
                            "uri": actualUri,
                        } }
                    ></Animated.Image>
                ) }
                { mediaInfos?.placeholder && (
                    <Animated.Image
                        blurRadius={ mediaInfos.placeholder.blurRadius || 0}
                        style={ [
                            styles.media, {
                                "backgroundColor": mediaInfos.placeholder.color,
                                "margin": mediaInfos.placeholder.offset,
                                "opacity": opacityTransition.current,
                            },
                        ] }
                        source={ {
                            "uri": mediaInfos?.placeholder.uri,
                        } }
                    ></Animated.Image>
                ) }
            </View>
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
                    this.state.ready && (
                        <TwicMedia {...props} viewSize={this.state.viewSize} />
                    )
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
    "media": {
        "position": `absolute`,
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
    },
    "wrapper": {
        "overflow": `hidden`,
        "width": `100%`,
        "height": `100%`,
    },
} );
