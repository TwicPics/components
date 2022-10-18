/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, ScrollView, StyleSheet, View } from 'react-native';
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
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Button title="Change mode" onPress={() => changeMode()} />
                    <View style={styles.imgContainer}>
                        <TwicImg
                            src="cat_1x1.jpg"
                            ratio="4/3"
                            mode={mode}
                            placeholder="preview"
                            style={styles.customImage}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create( {
    "imgContainer": {
        "marginTop": 20,
    },
    "customImage": {
        "height": 100,
        "backgroundColor": `#ff0000`,
    },
    "container": {
        "padding": 20,
    },
} );

export default Mode;
