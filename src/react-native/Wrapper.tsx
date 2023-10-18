/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import type { LayoutChangeEvent } from 'react-native';
// eslint-disable-next-line no-shadow, no-duplicate-imports
import { StyleSheet, View } from 'react-native';
import { computeContainerStyle, computeViewSize } from './compute';
import { parseEager, parseRatio } from "./parse";
import type { WrapperAttributes } from "./types";
import VisibilityDetector from './visibilityDetector';

const Wrapper = ( props: WrapperAttributes ) => {
    const { "eager": _eager, "ratio": _ratio = 1, style } = props;
    const eager = parseEager( _eager );
    const ratio = parseRatio( _ratio );
    return (
        <View
            onLayout={ ( e: LayoutChangeEvent ) => {
                const { width, height } = e.nativeEvent.layout;
                const viewSize = computeViewSize( width, height, ratio );
                if ( ( width > 0 ) && ( height > 0 ) ) {
                    props.onLayout( viewSize );
                }
            } }
            style={
                StyleSheet.flatten( [ styles.container, computeContainerStyle( style, ratio ) ] )
            }
        >
            <VisibilityDetector
                eager={ eager }
                onVisibilityChanged={ () => {
                    props.onVisibilityChanged( true );
                } }
            >
                { props.children }
            </VisibilityDetector>
        </View>
    );
};

const styles = StyleSheet.create( {
    "container": {
        "overflow": `hidden`,
        "width": `100%`,
    },
} );

export default Wrapper;
