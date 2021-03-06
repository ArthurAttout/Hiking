import React from 'react';
import {
    AppRegistry, Text, View, StyleSheet, StatusBar, Image,
    TouchableNativeFeedback, Dimensions, BackHandler, ActivityIndicator, Alert
} from 'react-native';
import { connect } from "react-redux";
import {COLORS, GAME_MODES} from "../utils/constants";
import {
    getNextBeacon, onCloseRiddleSolvingModal, onConfirmRiddleSolving, onRequestRiddleSolvingModal,
    resetTimer, riddleTimeOut, setCurrentAnswer, storeNextBeacon, submitButtonPressed, updateTeamLives, updateTimer
} from "../actions/actionsGameData";
import SolveRiddleModal from "./PlayerBeaconModals/SolveRiddleModal";
import {default as FCM, FCMEvent} from "react-native-fcm";
import TimerCountdown from "react-native-timer-countdown";

class BScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnPress = this.handleOnPress.bind(this);
        this.renderBottomBar = this.renderBottomBar.bind(this);
        this.renderTimer = this.renderTimer.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        FCM.getFCMToken().then((t) => console.log(t));
        FCM.on(FCMEvent.Notification, notif => {
            console.log("notif received");
            console.log(notif);

            if(notif['confirmPoint']){
                this.props.getNextBeacon();
                this.props.updateTeamLives(notif['lives']);
            } else if(notif['decrementLife']) {
                this.props.updateTeamLives(notif['lives'])
            }
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    render() {
        return (
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={COLORS.Primary_accent}
                        barStyle="light-content"
                    />
                    <View style={styles.topMessageView}>
                        <Text style={styles.topMessageText}>{this.props.nextBeacon.name}</Text>
                    </View>
                    <View style={styles.body}>
                        {this.renderTimer()}
                        <Image
                            resizeMode={'contain'}
                            style={{width: (Dimensions.get('window').width * 0.45), height: (Dimensions.get('window').width * 0.45)}}
                            source={{uri: this.props.nextBeacon.iconURL }}/>
                        <Text style={styles.beaconText}>
                            {(this.props.game.GameMode === GAME_MODES.NORMAL) ?
                                "You successfully reached the " + (this.props.nextBeacon.name !== null) ? this.props.nextBeacon.name : "" + " beacon!"
                                :
                                this.props.nextBeacon.statement}</Text>
                    </View>
                    {this.renderBottomBar()}
                    {this.renderModal()}
                </View>
        );
    }

    handleOnPress(){
        switch(this.props.game.GameMode){
            case GAME_MODES.NORMAL:
                this.props.getNextBeacon();
                break;
            case GAME_MODES.RIDDLES:
                this.props.onRequestRiddleSolvingModal();
                break;
            case GAME_MODES.RIDDLES_AND_QR_CODE:
                const { navigate } = this.props.navigation;
                navigate('QRCameraScreen');
                break;
        }
    }

    renderTimer() {
        if( ((this.props.game.GameMode === GAME_MODES.RIDDLES) ||
                (this.props.game.GameMode === GAME_MODES.RIDDLES_AND_QR_CODE)) &&
                this.props.settings.timerRiddle !== 0) {
            return (
                <View style={styles.countdownView}>
                    <TimerCountdown
                        initialSecondsRemaining={this.props.timerSecondsRemaining*1000}        // given in seconds
                        onTick={(secondsRemaining) => {
                            console.log("onTick");
                            this.props.updateTimer(secondsRemaining);
                        }}
                        onTimeElapsed={() => {
                            this.props.onCloseRiddleSolvingModal();
                            this.props.resetTimer();
                            this.props.riddleTimeOut();
                        }}
                        allowFontScaling={true}
                        style={styles.countdownTimer}
                    />
                </View>
            );
        } else {
            return (<Text style={styles.titleText}>Congrats!</Text>);
        }
    }

    renderBottomBar() {
        let nextButton = "";
        switch(this.props.game.GameMode){
            case GAME_MODES.NORMAL:
                nextButton = "NEXT BEACON >";
                break;
            case GAME_MODES.RIDDLES:
                nextButton = "SOLVE";
                break;
            case GAME_MODES.RIDDLES_AND_QR_CODE:
                nextButton = "CAPTURE QR CODE";
                break;
        }
        if(this.props.game.GameMode !== GAME_MODES.RIDDLES_AND_QR_CODE) {
            return (
                (this.props.showNextBeaconFetchActivity) ?
                    <View style={[styles.bottomView, {alignItems: 'center', justifyContent: 'center'}]}>
                        <ActivityIndicator size="small" color="#ffffff"/>
                    </View>
                    :
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={() => {this.handleOnPress()}}>
                        <View style={styles.bottomView}>
                            <Text style={styles.bottomText}>{nextButton}</Text>
                        </View>
                    </TouchableNativeFeedback>
            );
        } else {
            return (
                (this.props.showNextBeaconFetchActivity) ?
                    <View style={[styles.bottomView, {alignItems: 'center', justifyContent: 'center'}]}>
                        <ActivityIndicator size="small" color="#ffffff"/>
                    </View>
                    :
                    <View style={[styles.bottomView, {justifyContent:'space-between', flexDirection: 'row', padding: 0}]}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('white')}
                            onPress={() => {
                                Alert.alert(
                                    'Give up?',
                                    ((this.props.settings.lives === 0)?
                                        'Are you certain you wish to give up this riddle?' :
                                        'Are you certain you wish to give up this riddle?\nYou will lose 2 lives as a result.'),

                                    [
                                        {text: 'No, I\'ll keep trying', onPress: () => null},
                                        {text: 'Yes, I give up', onPress: () => {
                                                this.props.riddleTimeOut();
                                            }
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }}
                        >
                            <View style={{flex:2}}>
                                <Text style={[styles.bottomText, {textAlign: 'left', height: '100%', textAlignVertical: 'center', paddingLeft: '5%'}]}>{
                                    (this.props.settings.lives === 0)?
                                    "Give up" :
                                    "Give up (-2 lives)"
                                }</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('white')}
                            onPress={() => {
                                this.handleOnPress()
                            }}
                        >
                            <View style={{flex:2, height: '100%'}}>
                                <Text style={[styles.bottomText, {textAlign: 'right', height: '100%', textAlignVertical: 'center', paddingRight: '5%'}]}>{nextButton}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
            );
        }
    }

    renderModal(){
        return(
        <SolveRiddleModal
            riddleSolvingModalVisible={this.props.riddleSolvingModalVisible}
            currentAnswer = {this.props.currentAnswer}
            correctAnswer = {this.props.correctAnswer}
            game = {this.props.game}
            settings = {this.props.settings}
            teamInfo = {this.props.teamInfo}
            isSubmitButtonPressed = {this.props.isSubmitButtonPressed}
            submitButtonPressed = {this.props.submitButtonPressed}
            setCurrentAnswer={this.props.setCurrentAnswer}
            onConfirmRiddleSolving={this.props.onConfirmRiddleSolving}
            onCloseRiddleSolvingModal={this.props.onCloseRiddleSolvingModal}
            timerRiddle={this.props.settings.timerRiddle}
            riddleTimeOut={this.props.riddleTimeOut}/>
        );
    }
}


const mapStateToProps = (state, own) => {
    return {
        ...own,
        game: state.gameDataReducer.game,
        settings: state.gameDataReducer.settings,
        teamInfo: state.gameDataReducer.teamInfo,
        nextBeacon: state.gameDataReducer.nextBeacon,
        riddleSolvingModalVisible: state.gameDataReducer.riddleSolvingModalVisible,
        currentAnswer: state.gameDataReducer.currentAnswer,
        correctAnswer: state.gameDataReducer.correctAnswer,
        isSubmitButtonPressed: state.gameDataReducer.isSubmitButtonPressed,
        showNextBeaconFetchActivity: state.gameDataReducer.showNextBeaconFetchActivity,
        timerSecondsRemaining: state.gameDataReducer.timerSecondsRemaining
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        onCloseRiddleSolvingModal: () => dispatch(onCloseRiddleSolvingModal()),
        onRequestRiddleSolvingModal: () => dispatch(onRequestRiddleSolvingModal()),
        onConfirmRiddleSolving: () => dispatch(onConfirmRiddleSolving()),
        setCurrentAnswer: (answer) => dispatch(setCurrentAnswer(answer)),
        submitButtonPressed: () => dispatch(submitButtonPressed()),
        getNextBeacon: () => dispatch(getNextBeacon()),
        riddleTimeOut: () => dispatch(riddleTimeOut()),
        updateTimer: (secondsRemaining) => dispatch(updateTimer(secondsRemaining)),
        resetTimer: () => dispatch(resetTimer()),
        updateTeamLives: (updatedLives) => dispatch(updateTeamLives(updatedLives)),
    }
}

//Connect everything
export default BeaconScreen = connect(mapStateToProps, mapDispatchToProps)(BScreen);

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height - 23),
    },
    topMessageView: {
        backgroundColor: '#558b2f',
        padding: 10,
        width: '100%'
    },
    topMessageText: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bottomView:{
        height: 56,
        width: '100%',
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.Primary,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '5%'
    },
    bottomText:{
        color: 'white',
        fontSize: 20,
    },
    body: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 56
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10
    },
    beaconText: {
        fontSize: 17
    },
    countdownView:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        //width:'100%',
        //height:'100%'
    },
    countdownTimer: {
        fontSize: 50
    }
});

