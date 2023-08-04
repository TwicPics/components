/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-shadow
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const images = [
    {
        "url": `components/slider/pantone.jpg`,
    },
    {
        "url": `components/slider/coffee.jpg`,
    },
    {
        "url": `components/slider/reading.jpg`,
    },
    {
        "url": `components/slider/cat-2.jpg`,
    },
    {
        "url": `components/slider/mirror.jpg`,
    },
    {
        "url": `components/slider/books.jpg`,
    },
    {
        "url": `components/slider/sea.jpg`,
    },
    {
        "url": `components/slider/frames.jpg`,
    },
    {
        "url": `components/slider/dried-flower.jpg`,
    },
    {
        "url": `components/slider/dune.jpg`,
    },
    {
        "url": `components/slider/coffee-2.jpg`,
    },
    {
        "url": `components/slider/yak.jpg`,
    },
    {
        "url": `components/slider/dried-flower-2.jpg`,
    },
    {
        "url": `components/slider/guitar.jpg`,
    },
    {
        "url": `components/slider/field.jpg`,
    },
    {
        "url": `components/slider/woman-and-sand.jpg`,
    },
];

const LazyLoading = () => (
    <ScrollView>
        <View style={styles.container}>
            <Text>⬇️⬇️⬇️ Scroll down ⬇️⬇️⬇️</Text>
            <View style={{
                "marginTop": 3000,
            }}>
                <View style={styles.imgContainer}>
                    <TwicImg
                        src="components/slider/cat-2.jpg"
                        placeholder="preview"
                    />
                    <Text>Cat is lazy loaded</Text>
                </View>
                <View style={styles.imgContainer}>
                    <TwicImg
                        src="components/slider/yak.jpg"
                        eager
                        placeholder="preview"
                    />
                    <Text>Yak is eager loaded</Text>
                </View>
                <ScrollView horizontal style={ {
                    "marginTop": 20,
                } }>
                    { images.map( ( image, i ) => (
                        <View style={ styles.sliderItem } key={ i }>
                            <TwicImg
                                src={ image.url }
                                placeholder="preview"
                            />
                        </View>
                    ) ) }
                </ScrollView>
                <Text>An horizontal slider with lazy loaded images</Text>
            </View>
        </View>
    </ScrollView>
);

const styles = StyleSheet.create( {
    "imgContainer": {
        "marginTop": 20,
    },
    "container": {
        "padding": 20,
    },
    "sliderItem": {
        "width": 500,
        "marginRight": 20,
    },

} );

export default LazyLoading;
