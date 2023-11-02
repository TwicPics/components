/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const ratios = [ `1`, `4/3`, `16/9`, `3/4`, `none` ];
let indiceRatio = 0;

const Ratio = () => {
    const [ ratio, setRatio ] = useState( ratios[ indiceRatio ] );
    const changeRatio = () => {
        indiceRatio = ( indiceRatio + 1 ) % ratios.length;
        setRatio( ratios[ indiceRatio ] );
    };
    return (
        <View style={styles.container}>
            <Button title={`Change ratio - ${ ratio }`} onPress={() => changeRatio()} />
            <View style={styles.imgContainer}>
                <TwicImg
                    src="football.jpg"
                    ratio={ratio}
                    mode="contain"
                    transitionDuration="200"
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

export default Ratio;
