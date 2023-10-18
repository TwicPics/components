/* eslint-disable max-lines */

/* eslint-disable @typescript-eslint/no-use-before-define */
import { ResizeMode, Video } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-shadow
import { Animated, Image, StyleSheet, View } from 'react-native';

import {
    parseAlt,
    parseAnchor,
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
    computeAlt,
    computePosition,
    computeTimingConfig,
    computeUrls,
    computeWidth,
} from './compute';
import type { MediaAttributes } from './types';
import { getMediaInfos } from './mediaInfos';
import { debounce } from '../_/utils';

interface AssetAttributes {
  alt?: string,
  onLoad: ( ( ) => void ) ;
  uri: string,
}

const isSameAsset = ( prevProps : AssetAttributes, nextProps: AssetAttributes ) => {
    const result = prevProps.uri === nextProps.uri;
    return result;
};

// eslint-disable-next-line react/display-name
const _Image = React.memo( ( props: AssetAttributes ) => {
    const { alt, uri, onLoad } = props;
    return (
        uri && <Image
            alt = { alt }
            onLoad={ onLoad }
            source={ {
                uri,
            } }
            style={ [ styles.asset ] }
        ></Image>
    );
}, isSameAsset );

// eslint-disable-next-line react/display-name
const _Video = React.memo( ( props: AssetAttributes ) => {
    const { uri, onLoad } = props;
    return (
        uri && <Video
            isLooping
            isMuted
            onReadyForDisplay={() => {
                onLoad();
            }}
            resizeMode={ ResizeMode.COVER }
            shouldPlay
            source={ {
                uri,
            } }
            style={ [ styles.asset ] }
            videoStyle= { {
                "width": `100%`,
                "height": `100%`,
            }}
        ></Video>
    );
}, isSameAsset );

const Media = ( props: MediaAttributes ) => {
    const { mediaTag, visible, viewSize } = props;
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

    const _debounce = useRef(
        debounce(
            _media => {
                opacityTransition.setValue( transition.hasOwnProperty( `fade` ) ? 1 : 0 );
                setActualUri( _media );
            },
            {
                "leading": false,
                "ms": 100,
                "trailing": true,
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
        if ( visible ) {
            _debounce( media );
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
                { ( mediaTag === `img` ) && ( <_Image
                    alt={ computedAlt }
                    onLoad={ onLoad }
                    uri= { actualUri }
                /> ) }
                { ( mediaTag === `video` ) && ( <_Video
                    onLoad={ onLoad }
                    uri= { actualUri }
                /> ) }
                { mediaInfos?.placeholder && (
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
    );
};

const styles = StyleSheet.create( {
    "layout": {
        "flex": 1,
        "flexDirection": `column`,
        "overflow": `hidden`,
    },
    "asset": {
        "position": `absolute`,
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
    },
} );

export default Media;
