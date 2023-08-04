/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const configs = [
    {
        "mode": `cover`,
        "ratio": `1`,
        "refit": undefined,
        "anchor": undefined,
    },
    {
        "mode": `cover`,
        "ratio": `1`,
        "refit": true,
        "anchor": `left`,
    },
    {
        "mode": `cover`,
        "ratio": `1`,
        "refit": `5p`,
        "anchor": `left`,
    },
    {
        "mode": `cover`,
        "ratio": `1`,
        "refit": `5p`,
        "anchor": `right`,
    },
    {
        "mode": `contain`,
        "ratio": `1`,
        "refit": undefined,
        "anchor": undefined,
    },
    {
        "mode": `contain`,
        "ratio": `1`,
        "refit": true,
        "anchor": `left`,
    },
    {
        "mode": `contain`,
        "ratio": `1`,
        "refit": `5p`,
        "anchor": `left`,
    },
    {
        "mode": `contain`,
        "ratio": `1`,
        "refit": `5p`,
        "anchor": `right`,
    },
];

let indiceConfig = 0;

const Refit = () => {
    const [ config, setConfig ] = useState( configs[ indiceConfig ] );
    const changeConfig = () => {
        indiceConfig = ( indiceConfig + 1 ) % configs.length;
        setConfig( configs[ indiceConfig ] );
    };
    return (
        <View style={styles.container}>
            <Button title="Change config" onPress={() => changeConfig()} />
            <View style={styles.imgContainer}>
                <TwicImg
                    src="refit/bluewater-sweden-7EekldXjkw0-unsplash.jpg"
                    anchor={config.anchor}
                    mode={config.mode}
                    preTransform={config.preTransform}
                    ratio={config.ratio}
                    refit={config.refit}
                    style={styles.customImage}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    "imgContainer": {
        "marginTop": 20,
    },
    "customImage": {
        "height": 100,
        "backgroundColor": `#FFFFFF`,
    },
    "container": {
        "padding": 20,
    },
} );

export default Refit;
