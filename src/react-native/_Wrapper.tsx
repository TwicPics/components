/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import type { LayoutChangeEvent } from 'react-native';
// eslint-disable-next-line no-shadow, no-duplicate-imports
import { StyleSheet, View } from 'react-native';
import { computeContainerStyle, computeViewSize } from './compute';
import { parseRatio } from "./parse";
import type { WrapperAttributes } from "./types";
import { styles } from './styles';

export default ( props: WrapperAttributes ) => {
    const { "ratio": _ratio = 1, style } = props;
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
            { props.children }
        </View>
    );
};

