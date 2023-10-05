/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-shadow
import { Animated, Image, StyleSheet, View } from 'react-native';
// eslint-disable-next-line no-duplicate-imports
import type { LayoutChangeEvent } from 'react-native';

import VisibilityDetector from './visibilityDetector';
import {
    parseAlt,
    parseAnchor,
    parseEager,
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
import type { Attributes, MediaAttributes } from './types';
import { getMediaInfos } from './mediaInfos';
import { debounce } from '../_/utils';

const TwicMedia = React.memo( ( props: MediaAttributes ) => {
    const { viewSize } = props;
    const alt = parseAlt( props.alt );
    const anchor = parseAnchor( props.anchor );
    const eager = parseEager( props.eager );
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
    const computedAlt = computeAlt( alt, `img` );
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
    const opacityTransition = useRef( new Animated.Value( 0 ) ).current;
    const scaleTransition = useRef( new Animated.Value( transition.hasOwnProperty( `zoom` ) ? 0 : 1 ) ).current;
    const [ actualUri, setActualUri ] = useState( undefined );
    const [ mediaInfos, setMediaInfos ] = useState( undefined );
    const [ visible, setVisible ] = useState( false );
    const _fetch = useRef(
        debounce(
            async _media => {
                const res = await fetch( _media );
                opacityTransition.setValue( transition.hasOwnProperty( `fade` ) ? 1 : 0 );
                if ( res.ok ) {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL( await res.blob() );
                    fileReader.onload = () => {
                        setActualUri( fileReader.result );
                        if ( transition.hasOwnProperty( `none` ) ) {
                            opacityTransition.setValue( 0 );
                        } else {
                            Animated.timing(
                                opacityTransition,
                                computeTimingConfig( {
                                    "toValue": 0,
                                    transitionDelay,
                                    transitionDuration,
                                    transitionTimingFunction,
                                } )
                            ).start();
                            Animated.timing(
                                scaleTransition,
                                computeTimingConfig( {
                                    "toValue": 1,
                                    transitionDelay,
                                    transitionDuration,
                                    transitionTimingFunction,
                                } )
                            ).start();
                        }
                    };
                }
            },
            {
                "leading": false,
                "ms": 100,
                "trailing": true,
            }
        )
    ).current;

    useEffect( () => {
        (
            async () => {
                opacityTransition.setValue( transition.hasOwnProperty( `fade` ) ? 1 : 0 );
                setMediaInfos( await getMediaInfos( inspect, viewSize ) );
            }
        )();
    }, [ inspect ] );

    useEffect( () => {
        if ( visible ) {
            _fetch( media );
        }
    }, [ media, visible ] );

    return (
        <VisibilityDetector
            eager={ eager }
            onVisibilityChanged={ () => {
                setVisible( true );
            } }
        >
            <Animated.View style={ [
                styles.layout,
                computePosition( anchor, mode ),
                {
                    "transform": [
                        {
                            "scale": scaleTransition,
                        },
                    ],
                },
            ] } >
                <View style={ {
                    "aspectRatio": mediaInfos?.ratioIntrinsic,
                    "overflow": `hidden`,
                    "width": computeWidth( mediaInfos, viewSize ),
                } } >
                    { actualUri && (
                        <Image
                            alt={computedAlt}
                            style={ [ styles.media ] }
                            source={ {
                                "uri": actualUri,
                            } }
                        ></Image>
                    ) }
                    { mediaInfos?.placeholder && (
                        <Animated.Image
                            blurRadius={ mediaInfos.placeholder.blurRadius || 0}
                            style={ [
                                styles.media, {
                                    "backgroundColor": mediaInfos.placeholder.color,
                                    "margin": mediaInfos.placeholder.offset,
                                    "opacity": opacityTransition,
                                },
                            ] }
                            source={ {
                                "uri": mediaInfos?.placeholder.uri,
                            } }
                        ></Animated.Image>
                    ) }
                </View>
            </Animated.View>
        </VisibilityDetector>
    );
} );

const TwicImg = ( props: Attributes ) => {
    const { "ratio": _ratio = 1, style } = props;
    const ratio = parseRatio( _ratio );
    const [ viewSize, setViewSize ] = useState( undefined );
    const [ ready, setReady ] = useState( false );
    return (
        <View
            // eslint-disable-next-line no-shadow
            onLayout={ ( event: LayoutChangeEvent ) => {
                const { width, height } = event.nativeEvent.layout;
                setViewSize( computeViewSize( width, height, ratio ) );
                setReady( ( width > 0 ) && ( height > 0 ) );
            } }
            style={ StyleSheet.flatten( [ styles.container, computeContainerStyle( style, ratio ) ] ) }
        >
            {ready && <TwicMedia { ...props } viewSize={ viewSize } />}
        </View>
    );
};

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

export default TwicImg;
