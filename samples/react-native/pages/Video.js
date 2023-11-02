/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-shadow
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TwicVideo } from '@twicpics/components/react-native';

const Video = () => (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater.mp4"
                    preTransform="crop=720x720"
                    style={styles.customImage}
                    mode="cover"
                    placeholder="preview"
                />
                <Text>Mode = cover - Ratio = 1 (default)</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater.mp4"
                    preTransform="crop=720x720"
                    ratio="16/9"
                    mode="cover"
                    placeholder="maincolor"/>
                <Text>Mode = cover - Ratio = 16/9 - Maincolor</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater.mp4"
                    preTransform="crop=720x720"
                    ratio="16/9"
                    mode="contain"
                    placeholder="meancolor"/>
                <Text>Mode = contain - Ratio = 16/9 - Meancolor</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater.mp4"
                    preTransform="crop=720x720"
                    ratio="16/9"
                    mode="contain"
                    placeholder="meancolor"
                    anchor="left"
                />
                <Text>Mode = contain - Ratio = 16/9 - Anchor left</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater.mp4"
                    preTransform="crop=720x720"
                    ratio="16/9"
                    mode="contain"
                    placeholder="meancolor"
                    anchor="right"
                />
                <Text>Mode = contain - Ratio = 16/9 - Anchor right</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo src="video/purple-shirt.mp4" focus="100px0p"/>
                <Text>Mode = cover - Ratio = 1 (default) - Focus = 100px0p</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo src="video/purple-shirt.mp4" anchor="left" />
                <Text>Mode = cover - Ratio = 1 (default) - Anchor = left</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater-standing.mp4"
                    ratio="none" style={styles.customImage}
                />
                <Text>Mode = cover - Ratio = none</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater.mp4"
                    preTransform="crop=720x720/flip=both"
                />
                <Text>Mode = cover - Ratio = 1 - PreTransform = flip=both </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo
                    src="video/skater-standing.mp4"
                    preTransform="crop=720x720"
                    mode="contain"
                    ratio="3/4"
                    anchor="bottom left"
                />
                <Text>Mode = contain - Anchor = bottom left </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo src="video/skater-standing.mp4" focus="0px0p" />
                <Text>Mode = cover - focus = 0px0p </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicVideo src="video/skater-standing.mp4" style={styles.customImage} />
                <Text>Ratio = 1 + custom height : ratio takes precedence </Text>
            </View>
        </View>
    </ScrollView>
);

const styles = StyleSheet.create( {
    "imgContainer": {
        "width": `100%`,
        "marginBottom": 20,
    },
    "customImage": {
        "width": `50%`,
        "height": 100,
    },
    "container": {
        "padding": 20,
    },
} );

export default Video;
