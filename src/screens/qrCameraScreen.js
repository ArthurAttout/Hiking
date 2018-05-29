import React from 'react';
import { QRScannerView } from 'ac-qrcode';
import {connect} from "react-redux";
import {Toast, Text, Dimensions, StyleSheet, View, BackHandler, ActivityIndicator} from "react-native";
import TimerCountdown from "react-native-timer-countdown";
import {
    onConfirmQRScan, resetTimer, riddleTimeOut, updateTimer
} from "../actions/actionsGameData";
import {default as FCM, FCMEvent} from "react-native-fcm";
import {COLORS, GAME_MODES} from "../utils/constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class QRCScreen extends React.Component {

    constructor(props) {
        super(props);
        this.handleScanResult = this.handleScanResult.bind(this);
        this._renderTitleBar = this._renderTitleBar.bind(this);
        this.renderStars = this.renderStars.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        const { navigate } = this.props.navigation;
        navigate('BeaconScreen');
        // must return true to avoid looping on navigation
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        FCM.getFCMToken().then((t) => console.log(t));
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

    render() {
        return (
            (this.props.showNextBeaconFetchActivity) ?
                <ActivityIndicator size="large" color={COLORS.Primary}/>
                :
                < QRScannerView
                    onScanResultReceived={(evt) => this.handleScanResult(evt)}
                    renderTopBarView={() => this._renderTitleBar()}
                    renderBottomMenuView={() => this._renderMenu()}
                    hintText={"Searching for a QR code..."}
                    hintTextStyle={styles.hintText}
                />
        )
    }

    _renderTitleBar(){
        if(this.props.settings.timerRiddle === 0){
            return (
                <View style={styles.topView}>
                    <Text style={[styles.countdownTimer, {fontSize: 30}]}>Find the QR Code</Text>
                    <View style={styles.hearts}>
                        {this.renderStars()}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.topView}>
                    <TimerCountdown
                        initialSecondsRemaining={this.props.timerSecondsRemaining * 1000}        // given in seconds
                        onTick={(secondsRemaining) => {
                            this.props.updateTimer(secondsRemaining);
                        }}
                        onTimeElapsed={() => {
                            this.props.riddleTimeOut();
                        }}
                        allowFontScaling={true}
                        style={styles.countdownTimer}/>
                    <View style={styles.hearts}>
                        {this.renderStars()}
                    </View>
                </View>
            );
        }
    }

    _renderMenu() {
        return (
            <View style={styles.bottomView}>
                    <Text
                        style={styles.riddleText}>
                        {this.props.nextBeacon.statement}
                    </Text>
            </View>
        )
    }

    renderStars() {
        if(this.props.game.GameMode !== GAME_MODES.NORMAL){
            let stars = [];
            for(let i = this.props.settings.lives; i > 0; i--) {
                if(this.props.teamInfo.lives < i){
                    stars.push(
                        <Icon key={i} style={{color: 'red'}} size={(Dimensions.get('window').height * 0.04)}
                              color={COLORS.Primary} name="heart-outline"/>
                    )
                } else {
                    stars.push(
                        <Icon key={i} style={{color: 'red'}} size={(Dimensions.get('window').height * 0.04)}
                              color={COLORS.Primary} name="heart"/>
                    )
                }
            }
            return stars;
        }
    }

    handleScanResult(evt) {
        console.log('Type: ' + e.type + '\nData: ' + e.data);
        this.props.onConfirmQRScan(evt)
    }
}


const mapStateToProps = (state, own) => {
    return {
        ...own,
        game: state.gameDataReducer.game,
        settings: state.gameDataReducer.settings,
        teamInfo: state.gameDataReducer.teamInfo,
        ids: state.gameDataReducer.ids,
        nextBeacon: state.gameDataReducer.nextBeacon,
        timerSecondsRemaining: state.gameDataReducer.timerSecondsRemaining,
        showNextBeaconFetchActivity: state.gameDataReducer.showNextBeaconFetchActivity,
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        updateTimer: (secondsRemaining) => dispatch(updateTimer(secondsRemaining)),
        resetTimer: () => dispatch(resetTimer()),
        riddleTimeOut: () => dispatch(riddleTimeOut()),
        onConfirmQRScan: (evt) => dispatch(onConfirmQRScan(evt))
    }
}

//Connect everything
export default QRCameraScreen = connect(mapStateToProps, mapDispatchToProps)(QRCScreen);

const styles = StyleSheet.create({
    hintText: {
        textAlign: 'center',
        color: 'white',
        margin: 0,
        padding: 0
    },
    topView: {
    },
    beaconTitle:{
        color:'white',
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:30,
        padding:12,
        fontWeight: 'bold'
    },
    countdownTimer: {
        fontSize: 50,
        color: 'red',
        textAlign: 'center'
    },
    hearts:{
        //flex:1,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        margin: 10
    },
    bottomView: {

    },
    riddleText: {
        color: 'white',
        /*alternative for readability
        color:'black',
        backgroundColor: 'white',*/
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:15,
        padding:12
    },
});

