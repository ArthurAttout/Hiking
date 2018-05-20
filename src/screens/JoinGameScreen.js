import React from 'react';
import {
    AppRegistry, Text, TextInput, View, StyleSheet, TouchableNativeFeedback,
    StatusBar, Image,ActivityIndicator
} from 'react-native';
import { registerKilledListener, registerAppListener } from "../config/firebase/Listeners";
import FCM from "react-native-fcm";
import { TextInputLayout } from "rn-textinputlayout";
import TeamSelectionScreen from "./TeamSelectionScreen";
import {COLORS} from '../utils/constants'
import {connect} from "react-redux";
import {submit,setGameCode,setPlayerName} from "../actions/actionsJoinGame";
import {NavigationActions} from 'react-navigation';
import {navigatorRef} from "../../App";

registerKilledListener();
registerAppListener();

class JGScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if(this.props.isGameMaster){
            const { navigate } = this.props.navigation;
            navigate('GameMasterScreen');
        }
        else
        {
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
                            value={this.props.gameCode}
                            onChangeText={this.props.setGameCode}
                        />
                    </TextInputLayout>
                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor='#000000'>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Player name'}
                            id={'playerName'}
                            value={this.props.playerName}
                            onChangeText={this.props.setPlayerName}
                        />
                    </TextInputLayout>
                </View>
                {
                    this.props.showProgressStatus ?
                        <ActivityIndicator/>


                        :

                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('white')}
                            onPress={this.props.submit}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>NEXT</Text>
                            </View>
                        </TouchableNativeFeedback>
                }
            </View>
        );
    }
}

const mapStateToProps = (state, own) => {
    return {
        ...own,
        isGameMaster: state.joinGameReducer.isGameMaster,
        gameCode: state.joinGameReducer.gameCode,
        playerName: state.joinGameReducer.playerName,
        showProgressStatus: state.joinGameReducer.showProgressStatus,
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        submit: () => dispatch(submit()),
        setGameCode: (value) => dispatch(setGameCode(value)),
        setPlayerName: (value) => dispatch(setPlayerName(value)),
    }
};

//Connect everything
export default JoinGameScreen = connect(mapStateToProps, mapDispatchToProps)(JGScreen);

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

