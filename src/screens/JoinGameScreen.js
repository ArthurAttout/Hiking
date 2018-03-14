import React from 'react';
import {
    AppRegistry, Text, TextInput, View, StyleSheet, TouchableNativeFeedback,
    StatusBar, Image
} from 'react-native';
import { registerKilledListener, registerAppListener } from "../config/firebase/Listeners";
import FCM from "react-native-fcm";
import { TextInputLayout } from "rn-textinputlayout";
import TeamSelectionScreen from "./TeamSelectionScreen";

registerKilledListener();
registerAppListener();

export default class JoinGameScreen extends React.Component {
    static navigationOptions = {
        title: 'Joining Game',
        header: null,
    };

    constructor(props) {
        super(props);
        // TODO replace with redux
        this.state = {
            isGameReady: true,
            gameCode: '',
            playerName: ''
        };
        this._onPressNext = this._onPressNext.bind(this);
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
                    style={styles.image}
                    source={require('../images/logo_512.png')}/>
                <View style={styles.codesView}>
                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor='#000000'>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Game code'}
                            onChangeText={(gameCode) => this.setState({gameCode})}
                        />
                    </TextInputLayout>
                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor='#000000'>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Player name'}
                            onChangeText={(playerName) => this.setState({playerName})}
                        />
                    </TextInputLayout>
                </View>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={this._onPressNext}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    _onPressNext() {
        // TODO check if game ready (NB: should be done in background for player on the GameNotStarted screen)
        const { navigate } = this.props.navigation;
        navigate('TeamSelectionScreen');
    }

}
const styles = StyleSheet.create({
    image: {
        height: '55%',
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    codesView: {
        width: '90%',
        //height: 200,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    button: {
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#558b2f',
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 17,
        margin: 15,
    },
    textInput: {
        fontSize: 16,
        height: 60,

    },
    inputLayout: {
        //marginTop: 16,
        //marginHorizontal: 36,
        width: '90%',
        //marginBottom: 15,
    },
});

AppRegistry.registerComponent('Hiking', () => JoinGameScreen);

