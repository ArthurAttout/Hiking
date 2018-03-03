import React, { Component } from 'react';
import {
    AppRegistry, Text, TextInput, View, StyleSheet, Button, TouchableNativeFeedback,
    StatusBar, Image
} from 'react-native';
import CardView from 'react-native-cardview';
import { registerKilledListener, registerAppListener } from "./Listeners";
import FCM from "react-native-fcm";
import { TextInputLayout } from "rn-textinputlayout";

registerKilledListener();
registerAppListener();

export default class GameNotStartedScreen extends React.Component {
    static navigationOptions = {
        title: 'Game Not Started',
        header: null,
    };

    constructor(props) {
        super(props);
        // TODO replace with redux
        this.state = {
            isGameReady: true,
            gameCode: 'XEJ6',
            playerName: 'Cybo12',
            teamName: 'AtBoLo'
        };
        FCM.subscribeToTopic('gameStart');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#255d00"
                    barStyle="light-content"
                />
                <View style={styles.topView}>
                    <View style={styles.topMessageView}>
                        <Text style={styles.topMessageText}>The game has not started yet !</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={require('./assets/images/logo_512.png')}/>
                </View>
                <View style={styles.codesView}>
                    <View style={styles.codesPrompts}>
                        <Text style={styles.codesPromptsText}>Game code :</Text>
                        <Text style={styles.codesPromptsText}>Player name :</Text>
                        <Text style={styles.codesPromptsText}>Team name :</Text>
                    </View>
                    <View style={styles.codesEntered}>
                        <Text style={styles.codesEnteredText}>{this.state.gameCode}</Text>
                        <Text style={styles.codesEnteredText}>{this.state.playerName}</Text>
                        <Text style={styles.codesEnteredText}>{this.state.teamName}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    topView: {
        flex: 6,
        width: '100%',
    },
    topMessageView: {
        backgroundColor: '#558b2f',
        padding: 10,
    },
    topMessageText: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        flex: 1,
        height: '70%',
        resizeMode: 'contain',
        backgroundColor: '#85bb5c',
        alignSelf: 'center'
    },
    codesView: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        alignContent: 'space-around',
        justifyContent: 'center',
    },
    codesPrompts: {
        flex: 1,
        justifyContent: 'space-around',
    },
    codesEntered: {
        flex: 2,
        justifyContent: 'space-around',
    },
    codesPromptsText: {
        textAlign: 'right',
        fontSize: 20,
    },
    codesEnteredText: {
        marginLeft: 10,
        marginRight: 50,
        textAlign: 'center',
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
});

AppRegistry.registerComponent('Hiking', () => GameNotStartedScreen);

