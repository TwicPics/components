/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-shadow
import { Button, StyleSheet, View } from 'react-native';

const Divider = () => <View style={styles.divider} />;
const Home = ( { navigation } ) => (
    <View style={styles.container}>
        <Button title="Basic" onPress={() => navigation.navigate( `Basic` )} />
        <Divider />
        <Button title="Anchor" onPress={() => navigation.navigate( `Anchor` )} />
        <Divider />
        <Button title="Flatlist" onPress={() => navigation.navigate( `Flatlist` )} />
        <Divider />
        <Button title="Focus" onPress={() => navigation.navigate( `Focus` )} />
        <Divider />
        <Button title="Gallery" onPress={() => navigation.navigate( `Gallery` )} />
        <Divider />
        <Button title="Mode" onPress={() => navigation.navigate( `Mode` )} />
        <Divider />
        <Button title="Ratio" onPress={() => navigation.navigate( `Ratio` )} />
        <Divider />
        <Button title="Refit" onPress={() => navigation.navigate( `Refit` )} />
        <Divider />
        <Button title="Transform" onPress={() => navigation.navigate( `Transform` )} />
        <Divider />
    </View>
);

const styles = StyleSheet.create( {
    "container": {
        "padding": 20,
    },
    "divider": {
        "height": 12,
    },
} );

export default Home;
