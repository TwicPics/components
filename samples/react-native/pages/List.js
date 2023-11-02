/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
// eslint-disable-next-line no-shadow
import { SafeAreaView, StatusBar, View, FlatList, StyleSheet } from 'react-native';
import { TwicImg } from '@twicpics/components/react-native';

const seed = [
    {
        "url": `components/portraits/woman-1.jpg`,
        "focus": `50px45p`,
    },
    {
        "url": `components/portraits/man-1.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/woman-2.jpg`,
        "focus": `50px30p`,
    },
    {
        "url": `components/portraits/man-2.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-3.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-3.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-4.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-4.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-5.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-5.jpg`,
        "focus": `50px0p`,
    },
    {
        "url": `components/portraits/woman-6.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-6.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-7.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-7.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-8.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-8.jpg`,
        "focus": `50px100p`,
    },
    {
        "url": `components/portraits/woman-9.jpg`,
        "focus": `50px30p`,
    },
    {
        "url": `components/portraits/man-9.jpg`,
        "focus": `50px30p`,
    },
    {
        "url": `components/portraits/woman-10.jpg`,
        "focus": `50px55p`,
    },
    {
        "url": `components/portraits/man-10.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-11.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/man-11.jpg`,
        "focus": `50px35p`,
    },
    {
        "url": `components/portraits/woman-12.jpg`,
        "focus": `50px30p`,
    },
    {
        "url": `components/portraits/man-12.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-13.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-13.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-14.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/man-14.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-15.jpg`,
        "focus": `50px30p`,
    },
    {
        "url": `components/portraits/man-15.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-16.jpg`,
        "focus": `50px55p`,
    },
    {
        "url": `components/portraits/man-16.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/woman-17.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-17.jpg`,
        "focus": `50px60p`,
    },
    {
        "url": `components/portraits/woman-18.jpg`,
        "focus": ``,
    },
    {
        "url": `components/portraits/man-18.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/woman-19.jpg`,
        "focus": `50px60p`,
    },
    {
        "url": `components/portraits/man-19.jpg`,
        "focus": `50px20p`,
    },
    {
        "url": `components/portraits/woman-20.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/woman-21.jpg`,
        "focus": `50px45p`,
    },
    {
        "url": `components/portraits/woman-22.jpg`,
        "focus": `50px55p`,
    },
    {
        "url": `components/portraits/man-22.jpg`,
        "focus": `50px35p`,
    },
    {
        "url": `components/portraits/woman-23.jpg`,
        "focus": `50px45p`,
    },
    {
        "url": `components/portraits/man-26.jpg`,
        "focus": `50px45p`,
    },
    {
        "url": `components/portraits/woman-25.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/man-24.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/woman-26.jpg`,
        "focus": `50px40p`,
    },
    {
        "url": `components/portraits/man-25.jpg`,
        "focus": `50px40p`,
    },
];
const images = [ ...seed, ...seed, ...seed, ...seed ].map( e => ( {
    ...e,
    "id": Math.floor( Math.random() * 1000000 ),
    "url": `${ e.url }?v=${ Math.floor( Math.random() * 1000000 ) }`,
} ) );

const renderItem = ( { item } ) => (
    <View
        style={{
            "padding": 30,
        }}
    >
        <TwicImg src={ item.url } eager ratio="2.35" focus={ item.focus} />
    </View>
);

const List = () => (
    // eslint-disable-next-line no-use-before-define
    <SafeAreaView style={styles.container}>
        <FlatList data={images} renderItem={renderItem} keyExtractor={item => item.id}/>
    </SafeAreaView>
);
const styles = StyleSheet.create( {
    "container": {
        "flex": 1,
        "marginTop": StatusBar.currentHeight || 0,
    },
} );

export default List;
