import React from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableNativeFeedback, StatusBar, Image } from 'react-native';
import { registerKilledListener, registerAppListener } from "../config/firebase/Listeners";
import FCM from "react-native-fcm";
import {COLORS} from '../utils/constants'

registerKilledListener();
registerAppListener();


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this._onPressJoinGame = this._onPressJoinGame.bind(this);
        this._onPressNewGame = this._onPressNewGame.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#558b2f"
                    barStyle="light-content"
                />
                <Image
                    style={{height: '50%', resizeMode: 'contain'}}
                    source={require('../images/logo_512.png')}/>
                <View style={styles.codesView}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        delayPressIn={0}
                        style={styles.button}
                        onPress={this._onPressJoinGame}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>JOIN GAME</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.separator}/>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        delayPressIn={0}
                        onPress={this._onPressNewGame}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NEW GAME</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.copyrightView}>
                    <Text style={styles.copyrightText}>COPYRIGHT AtBoLo Team 2018</Text>
                </View>
            </View>
        );
    }

    _onPressJoinGame() {
        const { navigate } = this.props.navigation;
        FCM.subscribeToTopic('gameStart');
        navigate('JoinGameScreen');
    }

    _onPressNewGame() {
        const { navigate } = this.props.navigation;
        navigate('ChooseModeScreen');
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
    codesView: {
        width: '80%',
        height: 200,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '70%',
        alignItems: 'center',
        backgroundColor: COLORS.Secondary,
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 17,
        margin: 15,
    },
    separator: {
        backgroundColor: COLORS.Secondary,
        height: 5,
        width: '90%',
    },
    copyrightView: {
        position: 'absolute',
        bottom:10,
    },
    copyrightText: {
        color: '#a4a4a4',
    },
});

AppRegistry.registerComponent('Hiking', () => HomeScreen);

