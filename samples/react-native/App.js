/* eslint-disable no-use-before-define */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { installTwicpics } from '@twicpics/components/react-native';
import Anchor from './pages/Anchor.js';
import AnchorVideo from './pages/AnchorVideo.js';
import Basic from './pages/Basic.js';
import Focus from './pages/Focus.js';
import Gallery from './pages/Gallery.js';
import Home from './pages/Home.js';
import LazyLoading from './pages/LazyLoading.js';
import List from './pages/List.js';
import Mode from './pages/Mode.js';
import Ratio from './pages/Ratio.js';
import Refit from './pages/Refit.js';
import Transform from './pages/Transform.js';
import Video from './pages/Video.js';
import VideoSlicing from './pages/VideoSlicing.js';

installTwicpics( {
    "anticipation": 0.2,
    "debug": false,
    "domain": `https://demo.twic.it/`,
    "step": 100,
    "maxDPR": 3,
} );

const Stack = createNativeStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                "headerTintColor": `#FFFFFF`,
                "headerTitleStyle": {
                    "color": `#FFFFFF`,
                },
                "headerStyle": {
                    "backgroundColor": `#8D00F4`,
                },
                "headerTitleAlign": `center`,

            }}
        >
            <Stack.Screen name="Home" component={Home} options={{
                "title": `TwicPics x React Native`,
            }} />
            <Stack.Screen name="Anchor" component={Anchor} options={{
                "title": `Anchor`,
            }} />
            <Stack.Screen name="AnchorVideo" component={AnchorVideo} options={{
                "title": `Anchor Video`,
            }} />
            <Stack.Screen name="Basic" component={Basic} options={{
                "title": `Basic`,
            }} />
            <Stack.Screen name="Flatlist" component={List} options={{
                "title": `Flatlist`,
            }} />
            <Stack.Screen name="Focus" component={Focus} options={{
                "title": `Focus`,
            }} />
            <Stack.Screen name="Gallery" component={Gallery} options={{
                "title": `Gallery`,
            }} />
            <Stack.Screen name="LazyLoading" component={LazyLoading} options={{
                "title": `Lazy Loading`,
            }} />
            <Stack.Screen name="Mode" component={Mode} options={{
                "title": `Mode`,
            }} />
            <Stack.Screen name="Ratio" component={Ratio} options={{
                "title": `Ratio`,
            }} />
            <Stack.Screen name="Refit" component={Refit} options={{
                "title": `Refit`,
            }} />
            <Stack.Screen name="Transform" component={Transform} options={{
                "title": `Transform`,
            }} />
            <Stack.Screen name="Video" component={Video} options={{
                "title": `Video`,
            }} />
            <Stack.Screen name="VideoSlicing" component={VideoSlicing} options={{
                "title": `Video Slicing`,
            }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
