import React, { Component } from 'react';
import { Alert, AppRegistry, Text, TextInput, View, StyleSheet, Button } from 'react-native';
import CardView from 'react-native-cardview';
import { registerKilledListener, registerAppListener } from "./Listeners";
import FCM from "react-native-fcm";

registerKilledListener();
registerAppListener();

export default class JoinGameScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
        this.state = {username:'', password: ''};
        FCM.subscribeToTopic('gameStart');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    style={styles.cardView}>
                    <Text>Hello</Text>
                </CardView>
            </View>
        );
    }


    _onPressJoinGame() {
        const { navigate } = this.props.navigation;
        navigate('JoinGameScreen',this.state);
    }

    _onPressNewGame() {
        const { navigate } = this.props.navigation;
        navigate('CreateGameScreen',this.state);
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#266184'
    },
    cardView: {
        width: '100%',
        height: 420,
        backgroundColor: '#ffffff'
    },
    button: {
        margin: 150,
        padding: 150
    }
});

AppRegistry.registerComponent('Hiking', () => FormLogin);

