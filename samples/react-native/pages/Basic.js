/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-shadow
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const Basic = () => (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <TwicImg src="cat_1x1.jpg" style={styles.customImage} mode="cover" placeholder="preview"/>
                <Text>Mode = cover - Ratio = 1 (default)</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="cat_1x1.jpg" ratio="16/9" mode="cover" placeholder="maincolor"/>
                <Text>Mode = cover - Ratio = 16/9 - Maincolor</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="cat_1x1.jpg" ratio="4/3" mode="cover" />
                <Text>Mode = cover - Ratio = 4/3</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="cat_1x1.jpg" ratio="16/9" mode="contain" placeholder="meancolor"/>
                <Text>Mode = contain - Ratio = 16/9 - Meancolor</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg
                    src="cat_1x1.jpg"
                    ratio="16/9"
                    mode="contain"
                    placeholder="meancolor"
                    anchor="left"
                />
                <Text>Mode = contain - Ratio = 16/9 - Anchor left</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg
                    src="cat_1x1.jpg"
                    ratio="16/9"
                    mode="contain"
                    placeholder="meancolor"
                    anchor="right"
                />
                <Text>Mode = contain - Ratio = 16/9 - Anchor right</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="cat_1x1.jpg" ratio="4/3" mode="contain" />
                <Text>Mode = contain - Ratio = 4/3</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="/football.jpg" focus="auto" />
                <Text>Mode = cover - Ratio = 1 (default) - Focus = auto</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="/football.jpg" focus="100px0p" />
                <Text>Mode = cover - Ratio = 1 (default) - Focus = 100px0p</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="/football.jpg" anchor="right" />
                <Text>Mode = cover - Ratio = 1 (default) - Anchor = right</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="football.jpg" ratio="none" style={styles.customImage} />
                <Text>Mode = cover - Ratio = none</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="cat_1x1.jpg" ratio="1" preTransform="flip=x" />
                <Text>Mode = cover - Ratio = 1 - PreTransform = flip=x </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg
                    src="components/flip/orange-1.jpg"
                    mode="contain"
                    ratio="4/3"
                    anchor="bottom left"
                />
                <Text>TODO Mode = contain - Anchor = bottom left </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg
                    src="https://assets.twicpics.com/examples/football.jpg"
                    anchor="bottom left"
                />
                <Text>Mode = cover - Anchor = bottom left </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="football.jpg" focus="0px0p" />
                <Text>Mode = cover - focus = 0px0p </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="football.jpg" style={styles.customImage} />
                <Text>Ratio = 1 + custom height : ratio takes precedence </Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg src="football.jpg" />
                <Text>Only src</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg style={styles.customImage} mode="cover" ratio="4/3"/>
                <Text>Mode = cover, no src</Text>
            </View>
            <View style={styles.imgContainer}>
                <TwicImg style={styles.customImage} mode="contain" ratio="4/3" />
                <Text>Mode = contain, no src</Text>
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
        "backgroundColor": `#8F00FF`,
    },
    "container": {
        "padding": 20,
    },
} );

export default Basic;
