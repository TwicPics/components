/* eslint-disable no-use-before-define */
import { useState } from 'react';
// eslint-disable-next-line no-shadow
import { Button, StyleSheet, Text, View } from 'react-native';
import { TwicVideo } from '@twicpics/components/react-native';

const config = [
    {
        "from": undefined,
        "to": undefined,
        "duration": undefined,
        "posterFrom": 5,
    },
    {
        "from": 5.1,
        "to": undefined,
        "duration": undefined,
        "posterFrom": undefined,
    },
    {
        "from": 15.4,
        "to": 16.6,
        "duration": undefined,
        "posterFrom": undefined,
    },
    {
        "from": 15.4,
        "to": undefined,
        "duration": 1.2,
        "posterFrom": undefined,
    },
    {
        "from": 1,
        "to": 2,
        "duration": undefined,
        "posterFrom": undefined,
    },
];
let indiceConfig = 0;

const VideoSlicing = () => {
    const [ value, setConfig ] = useState( config[ indiceConfig ] );
    const changeConfig = () => {
        indiceConfig = ( indiceConfig + 1 ) % config.length;
        setConfig( config[ indiceConfig ] );
    };
    return (
        <View style={styles.container}>
            <Button title="Change slicing" onPress={() => changeConfig()} />
            <View>
                <Text>From { value.from }</Text>
                <Text>To { value.to }</Text>
                <Text>Duration { value.duration }</Text>
                <Text>PosterFrom { value.posterFrom }</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater.mp4"
                    preTransform="crop=720x720"
                    from={ value.from }
                    to={ value.to }
                    duration={ value.duration }
                    posterFrom={ value.posterFrom }
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

export default VideoSlicing;
