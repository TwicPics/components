/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const focuses = [ `50px50p`, `auto`, `right` ];
let indiceFocus = 0;

const Focus = () => {
    // eslint-disable-next-line no-shadow
    const [ focus, setFocus ] = useState( focuses[ indiceFocus ] );
    const changeFocus = () => {
        indiceFocus = ( indiceFocus + 1 ) % focuses.length;
        setFocus( focuses[ indiceFocus ] );
    };
    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Button title={`Change focus - ${ focus }`} onPress={() => changeFocus()} />
                    <View style={styles.imgContainer}>
                        <TwicImg
                            src="football.jpg"
                            focus={focus}
                            ratio="3/4"
                            mode="cover"
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
    },
    "container": {
        "padding": 20,
    },
} );

export default Focus;
