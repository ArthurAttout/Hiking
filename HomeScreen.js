import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableNativeFeedback, StatusBar, Image } from 'react-native';
import CardView from 'react-native-cardview';
import { registerKilledListener, registerAppListener } from "./Listeners";
import FCM from "react-native-fcm";
import SvgUri from 'react-native-svg-uri';


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
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#558b2f"
                    barStyle="light-content"
                />
                <Image
                    style={{height: '50%', resizeMode: 'contain'}}
                    source={require('./assets/images/logo_512.png')}/>
                <View style={styles.cardView}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        style={styles.button}
                        onPress={this._onPressJoinGame}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>JOIN GAME</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.separator}/>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={this._onPressNewGame}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NEW GAME</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }


    _onPressJoinGame() {
        const { navigate } = this.props.navigation;
        navigate('JoinGameScreen');
    }

    _onPressNewGame() {
        const { navigate } = this.props.navigation;
        navigate('CreateGameScreen');
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
    cardView: {
        width: '80%',
        height: 200,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '70%',
        alignItems: 'center',
        backgroundColor: '#558b2f',
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        margin: 15,
    },
    separator: {
        backgroundColor: '#558b2f',
        height: 5,
        width: '90%',
    }
});

AppRegistry.registerComponent('Hiking', () => HomeScreen);

