/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-shadow
import { Animated, Platform, View } from 'react-native';
import {
    parseAlt,
    parseAnchor,
    parseCachePolicy,
    parseEager,
    parseFocus,
    parseMode,
    parsePlaceholder,
    parsePreTransform,
    parseRefit,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from './parse';
import {
    computeMediaAttributes,
    computePosition,
    computeTimingConfig,
    computeUrls,
    computeWidth,
} from './compute';
import type { MediaAttributes } from './types';
import { getMediaInfos } from './mediaInfos';
import { config } from '../_/config';
import { debounce } from '../_/utils';
// eslint-disable-next-line no-shadow
import Image from './_Image';
import ImageCache from './_ImageCache';
import Video from './_Video';
import { styles } from './styles';
import VisibilityDetector from './visibilityDetector';
import { useIsInCache } from './Cache';

export default ( props: MediaAttributes ) => {
    const { crossOrigin, mediaTag, referrerPolicy, videoOptions, viewSize } = props;
    const alt = parseAlt( props.alt );
    const anchor = parseAnchor( props.anchor );
    const cachePolicy = parseCachePolicy( props.cachePolicy ) || config.cachePolicy;
    const eager = parseEager( props.eager );
    // eslint-disable-next-line no-shadow
    const focus = parseFocus( props.focus );
    const mode = parseMode( props.mode );
    const placeholder = parsePlaceholder( props.placeholder );
    const preTransform = parsePreTransform( props.preTransform );
    const refit = parseRefit( props.refit );
    const src = parseSrc( props.src );
    const step = parseStep( props.step );
    const transition = parseTransition( props.transition );
    const transitionDelay = parseTransitionDelay( props.transitionDelay );
    const transitionDuration = parseTransitionDuration( props.transitionDuration );
    const transitionTimingFunction = parseTransitionTimingFunction( props.transitionTimingFunction );
    // eslint-disable-next-line no-nested-ternary
    const MediaComponent = mediaTag === `img` ?
        ( cachePolicy === `none` ? Image : ImageCache ) :
        Video;

    const { "alt": computedAlt } = computeMediaAttributes( alt, undefined, undefined, mediaTag, undefined );
    const { media, inspect, poster } = computeUrls(
        mediaTag, {
            anchor,
            focus,
            mode,
            placeholder,
            preTransform,
            refit,
            src,
            step,
            videoOptions,
            viewSize,
        }
    );
    const opacityTransition = useRef( new Animated.Value( 0 ) ).current;
    const scaleTransition = useRef( new Animated.Value( transition.hasOwnProperty( `zoom` ) ? 0 : 1 ) ).current;
    const [ actualUri, setActualUri ] = useState( undefined );
    const [ mediaInfos, setMediaInfos ] = useState( undefined );
    const [ visible, setVisible ] = useState( false );

    const isInCache = ( mediaTag === `img` ) && ( cachePolicy !== `none` ) && useIsInCache( media );

    const _debounce = useRef(
        debounce(
            _media => {
                setActualUri( _media );
            },
            {
                "leading": Platform.OS !== `web`,
                "ms": 100,
                "trailing": Platform.OS === `web`,
            }
        )
    ).current;

    const onLoad = () => {
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

    useEffect( () => {
        if ( visible || eager ) {
            _debounce( media );
            if ( config.env === `debug` ) {
                // eslint-disable-next-line no-console
                console.debug( `Displaying: ${ media }${ isInCache ? `(from cache)` : `` } ` );

            }
        }
    }, [ media, visible ] );

    useEffect( () => {
        (
            async () => {
                opacityTransition.setValue( transition.hasOwnProperty( `fade` ) ? 1 : 0 );
                setMediaInfos( await getMediaInfos( inspect, viewSize ) );
            }
        )();
    }, [ inspect ] );

    return (
        <VisibilityDetector
            isInCache= { isInCache }
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
                    <MediaComponent
                        alt={ computedAlt }
                        cachePolicy={ cachePolicy }
                        crossOrigin={ crossOrigin }
                        onLoad={ onLoad }
                        referrerPolicy={ referrerPolicy }
                        uri={ actualUri }
                        poster={ poster }
                    />
                    { mediaInfos?.placeholder && !isInCache && (
                        <Animated.Image
                            blurRadius={ mediaInfos.placeholder.blurRadius || 0}
                            style={ [
                                styles.asset, {
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
};

