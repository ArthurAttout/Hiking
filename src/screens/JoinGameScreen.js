import React from 'react';
import {
    AppRegistry, Text, TextInput, View, StyleSheet, TouchableNativeFeedback,
    StatusBar, Image
} from 'react-native';
import { registerKilledListener, registerAppListener } from "../config/firebase/Listeners";
import FCM from "react-native-fcm";
import { TextInputLayout } from "rn-textinputlayout";
import TeamSelectionScreen from "./TeamSelectionScreen";
import {COLORS} from '../utils/constants'
import {addBeacon, dragBeacon, setupInitialMap, startTracking, touchBeacon} from "../actions/actionsCreateGameMap";
import {connect} from "react-redux";
import {inputCode} from "../actions/actionsJoinGame";
import {isCodePlayer} from "../config/FakeServer";

registerKilledListener();
registerAppListener();

class JGScreen extends React.Component {
    static navigationOptions = {
        title: 'Joining Game',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            gameCode: "",
            playerName:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const gameCode = this.state.gameCode;
        const playerName = this.state.playerName;
        this.props.inputCode(gameCode, playerName);
        if(isCodePlayer(gameCode)){
            const { navigate } = this.props.navigation;
            navigate('TeamSelectionScreen');
        } else {
            // TODO replace with GM screen
            const { navigate } = this.props.navigation;
            navigate('TeamSelectionScreen');
        }
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
                        focusColor={COLORS.Primary}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Game code'}
                            id={'gameCode'}
                            value={this.state.gameCode}
                            onChangeText={(gameCode) => this.setState({gameCode})}
                        />
                    </TextInputLayout>
                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor='#000000'>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Player name'}
                            id={'playerName'}
                            value={this.state.playerName}
                            onChangeText={(playerName) => this.setState({playerName})}
                        />
                    </TextInputLayout>
                </View>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={this.handleSubmit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        inputCode: (gameCode, playerName) => dispatch(inputCode(gameCode, playerName)),
    }
};

//Connect everything
export default JoinGameScreen = connect(null, mapDispatchToProps)(JGScreen);

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
        color: '#ffffff',
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

