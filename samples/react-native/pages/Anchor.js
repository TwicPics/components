/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const config = [
    {
        "anchor": `top`,
        "mode": `contain`,
        "ratio": `3/4`,
    },
    {
        "anchor": `right`,
        "mode": `contain`,
        "ratio": `4/3`,
    },
    {
        "anchor": `bottom`,
        "mode": `contain`,
        "ratio": `3/4`,
    },
    {
        "anchor": `left`,
        "mode": `contain`,
        "ratio": `4/3`,
    },
    {
        "anchor": `top`,
        "mode": `cover`,
        "ratio": `16/9`,
    },
    {
        "anchor": `bottom`,
        "mode": `cover`,
        "ratio": `16/9`,
    },
    {
        "anchor": `left`,
        "mode": `cover`,
        "ratio": `9/16`,
    },
    {
        "anchor": `right`,
        "mode": `cover`,
        "ratio": `9/16`,
    },
];
let indiceConfig = 0;

const Anchor = () => {
    const [ value, setConfig ] = useState( config[ indiceConfig ] );
    const changeAnchor = () => {
        indiceConfig = ( indiceConfig + 1 ) % config.length;
        setConfig( config[ indiceConfig ] );
    };
    return (
        <View style={styles.container}>
            <Button title="Change anchor" onPress={() => changeAnchor()} />
            <View style={styles.imgContainer}>
                <TwicImg
                    src="cat_1x1.jpg"
                    anchor={value.anchor}
                    mode={value.mode}
                    placeholder="preview"
                    ratio={value.ratio}
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
        "backgroundColor": `#8F00FF`,
    },
    "container": {
        "padding": 20,
    },
} );

export default Anchor;
