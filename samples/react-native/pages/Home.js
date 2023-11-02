/* eslint-disable no-use-before-define */
import React from 'react';
// eslint-disable-next-line no-shadow
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const samples = [
    {
        "route": `Anchor`,
        "text": `Anchor`,
    },
    {
        "route": `AnchorVideo`,
        "text": `Anchor Video`,
    },
    {
        "route": `Basic`,
        "text": `Basic`,
    },
    {
        "route": `Flatlist`,
        "text": `Flatlist`,
    },
    {
        "route": `Focus`,
        "text": `Focus`,
    },
    {
        "route": `Gallery`,
        "text": `Gallery`,
    },
    {
        "route": `LazyLoading`,
        "text": `Lazy Loading`,
    },
    {
        "route": `Mode`,
        "text": `Mode`,
    },
    {
        "route": `Ratio`,
        "text": `Ratio`,
    },
    {
        "route": `Refit`,
        "text": `Refit`,
    },
    {
        "route": `Transform`,
        "text": `Transform`,
    },
    {
        "route": `Video`,
        "text": `Video`,
    },
    {
        "route": `VideoSlicing`,
        "text": `Video Slicing`,
    },
];

const Home = ( { navigation } ) => (
    <View style={ styles.container }>
        <View style={ styles.buttonsContainer }>
            {samples.map( ( sample, index ) => (
                <TouchableOpacity
                    style={ styles.button }
                    onPress={ () => navigation.navigate( sample.route ) }
                    key={ index }
                >
                    <Text style={ styles.buttonText }>{ sample.text }</Text>
                </TouchableOpacity>
            ) )}
        </View>
    </View>
);

const styles = StyleSheet.create( {
    "button": {
        "aspectRatio": 1,
        "justifyContent": `center`,
        "alignItems": `center`,
        "backgroundColor": `#1E80F0`,
        "borderRadius": 10,
        "width": `30%`,
        "margin": `1.5%`,
    },
    "buttonsContainer": {
        "flexDirection": `row`,
        "flexWrap": `wrap`,
    },
    "buttonText": {
        "color": `white`,
    },
    "container": {
        "flex": 1,
        "padding": 20,
    },
} );

export default Home;
