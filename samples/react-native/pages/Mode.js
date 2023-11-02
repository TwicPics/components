/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const modes = [ `cover`, `contain` ];
let indiceMode = 0;

const Mode = () => {
    const [ mode, setMode ] = useState( modes[ indiceMode ] );
    const changeMode = () => {
        indiceMode = ( indiceMode + 1 ) % modes.length;
        setMode( modes[ indiceMode ] );
    };
    return (
        <View style={styles.container}>
            <Button title={`Change mode - ${ mode }`} onPress={() => changeMode()} />
            <View style={styles.imgContainer}>
                <TwicImg
                    src="cat_1x1.jpg"
                    ratio="4/3"
                    mode={mode}
                    placeholder="preview"
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

export default Mode;
