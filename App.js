// import React,{useState, useEffect} from 'react';
// import {StatusBar, Button, StyleSheet, Text, View} from 'react-native';
//
// import {Audio} from "expo-av";
// import {Gyroscope} from "expo-sensors";
//
// const styles = StyleSheet.create({
//   container: {
//
//   },
// });
//
//
// export default function App() {
//
//     const [mySound, setMySound] = useState();
//
//     async function playSound() {
//         const soundfile = require('./36427__marvman__shake-tic-tacs.wav');
//         const {sound} = await Audio.Sound.createAsync(soundfile);
//         setMySound(sound);
//         await Sound.playAsync();
//     }
//
//     useEffect(() => {
//         return mySound
//         ? () => {
//             console.log('Unloading Sound')
//                 mySound.unloadAsync()
//             }
//         :undefined
//     }, [mySound]);
//
//
//   return (
//     <View>
//       <StatusBar />
//       <Button title="Play Sound" onPress={
//       ()=>{
//           playSound();
//       }}
//       />
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { Gyroscope } from 'expo-sensors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default function App() {
    const [mySound, setMySound] = useState();
    const [isShaking, setIsShaking] = useState(false);

    async function playSound() {
        const soundfile = require('./36427__marvman__shake-tic-tacs.wav');
        const { sound } = await Audio.Sound.createAsync(soundfile);
        setMySound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        Gyroscope.setUpdateInterval(100);

        const subscription = Gyroscope.addListener(({ x, y, z }) => {
            if (x > 2.5 || x < -2.5 || y > 2.5 || y < -2.5 || z > 2.5 || z < -2.5) {
                setIsShaking(true);
                playSound();
            } else {
                setIsShaking(false);
            }
        });

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        return mySound
            ? () => {
                mySound.unloadAsync();
            }
            : undefined;
    }, [mySound]);

    return (
        <View style={styles.container}>
            <StatusBar />
            {isShaking && <Text style={styles.text}>SHAKE</Text>}
        </View>
    );
}

