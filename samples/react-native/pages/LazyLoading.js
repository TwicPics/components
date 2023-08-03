/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-shadow
import { ScrollView, StyleSheet, View } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const LazyLoading = () => (
    <View>
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <TwicImg
                        src="cat_1x1.jpg"
                        placeholder="preview"
                    />
                </View>
                <View style={styles.imgContainer}>
                    <TwicImg
                        src="football.jpg"
                        eager
                        placeholder="preview"
                    />
                </View>
            </View>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create( {
    "imgContainer": {
        "marginTop": 20,
    },
    "container": {
        "marginTop": 2000,
        "padding": 20,
    },
} );

export default LazyLoading;
