import React from 'react';
import {
    AppRegistry, Text, View, StyleSheet, StatusBar, Image,
    TouchableNativeFeedback, Dimensions, BackHandler
} from 'react-native';
import { connect } from "react-redux";
import {COLORS, GAME_MODES} from "../utils/constants";
import {getNextBeacon2} from "../config/FakeServer";
import {
    getNextBeacon, getNextBeaconNoConfirm,
    onCloseOutOfZoneModal, onCloseRiddleSolvingModal, onConfirmRiddleSolving, onRequestOutOfZoneModal,
    onRequestRiddleSolvingModal, riddleTimeOut, setCurrentAnswer,
    storeNextBeacon, submitButtonPressed
} from "../actions/actionsGameData";
import SolveRiddleModal from "./PlayerBeaconModals/SolveRiddleModal";
import {default as FCM, FCMEvent} from "react-native-fcm";

class BScreen extends React.Component {
    static navigationOptions = {
        title: 'Zone Name',      // TODO replace with team name from redux
        headerStyle: {
            backgroundColor: COLORS.Primary
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    componentDidMount() {
        FCM.getFCMToken().then((t) => console.log(t));
        FCM.on(FCMEvent.Notification, notif => {
            console.log("notif received");
            console.log(notif);

            if(notif['confirmPoint']){ //Expected notification
                this.props.getNextBeaconNoConfirm();
            } else if(notif['gameOver']) {
                this.props.getLastBeacon();
            }
        });
    }

    render() {
        // TODO manage beacon text for the different modes
        // TODO fix image size to dynamic (45% seems good)
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
                        <Text style={styles.titleText}>Congrats!</Text>
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
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={() => {this.handleOnPress()}}
                    >
                        <View style={styles.bottomView}>
                            <Text style={styles.bottomText}>{(this.props.game.GameMode ===  GAME_MODES.NORMAL) ? "NEXT BEACON >" : "SOLVE" }</Text>
                        </View>
                    </TouchableNativeFeedback>
                    {this._renderModal()}
                </View>
        );
    }

    handleOnPress(){
        const { navigate } = this.props.navigation;
        if(this.props.game.GameMode ===  GAME_MODES.NORMAL){
            // TODO get next beacon
            this.props.getNextBeacon();
        } else {
            // TODO manage solving riddles
            this.props.onRequestRiddleSolvingModal();
        }
    }

    _renderModal(){
        return(
        <SolveRiddleModal
            modalVisible={this.props.riddleSolvingModalVisible}
            currentAnswer = {this.props.currentAnswer}
            correctAnswer = {this.props.correctAnswer}
            game = {this.props.game}
            teamInfo = {this.props.teamInfo}
            isSubmitButtonPressed = {this.props.isSubmitButtonPressed}
            submitButtonPressed = {this.props.submitButtonPressed}
            setCurrentAnswer={this.props.setCurrentAnswer}
            onConfirmRiddleSolving={this.props.onConfirmRiddleSolving}
            onCloseModal={this.props.onCloseRiddleSolvingModal}
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
        isSubmitButtonPressed: state.gameDataReducer.isSubmitButtonPressed
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        storeNextBeacon: (nextBeacon) => dispatch(storeNextBeacon(nextBeacon)),
        onCloseRiddleSolvingModal: () => dispatch(onCloseRiddleSolvingModal()),
        onRequestRiddleSolvingModal: () => dispatch(onRequestRiddleSolvingModal()),
        onConfirmRiddleSolving: () => dispatch(onConfirmRiddleSolving()),
        setCurrentAnswer: (answer) => dispatch(setCurrentAnswer(answer)),
        submitButtonPressed: () => dispatch(submitButtonPressed()),
        getNextBeacon: () => dispatch(getNextBeacon()),
        getNextBeaconNoConfirm: () => dispatch(getNextBeaconNoConfirm()),
        riddleTimeOut: () => dispatch(riddleTimeOut()),
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
    }
});

