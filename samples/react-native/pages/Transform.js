/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, Easing, ScrollView, StyleSheet, View } from 'react-native';
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
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Button title="Change transform" onPress={() => changeTransform()} />
                    <View style={styles.imgContainer}>
                        <TwicImg
                            src="cat_1x1.jpg"
                            mode="contain"
                            placeholder="preview"
                            preTransform={transform}
                            ratio="4/3"
                            style={styles.customImage}
                            transition="fade"
                            transitionTimingFunction={Easing.ease}
                            transitionDelay="0"
                            transitionDuration="400"
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
        "backgroundColor": `#FF0000`,
    },
    "container": {
        "padding": 20,
    },
} );

export default Transform;
