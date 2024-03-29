/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const transforms = [ ``, `flip=x`, `flip=y`, `focus=60px50p/crop=25px25p` ];
let indiceTransform = 0;

const Transform = () => {
    const [ transform, setTransform ] = useState( transforms[ indiceTransform ] );
    const changeTransform = () => {
        indiceTransform = ( indiceTransform + 1 ) % transforms.length;
        setTransform( transforms[ indiceTransform ] );
    };
    return (
        <View style={styles.container}>
            <Button title={`Change transform - ${ transform }`} onPress={() => changeTransform()} />
            <View style={styles.imgContainer}>
                <TwicImg
                    src="cat_1x1.jpg"
                    mode="contain"
                    placeholder="preview"
                    preTransform={transform}
                    ratio="4/3"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    "imgContainer": {
        "marginTop": 20,
    },
    "container": {
        "padding": 20,
    },
} );

export default Transform;
