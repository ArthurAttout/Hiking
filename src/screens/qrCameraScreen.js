import React from 'react';
import { QRScannerView } from 'ac-qrcode';
import {connect} from "react-redux";
import {Toast, Text, Dimensions, StyleSheet, View} from "react-native";
import TimerCountdown from "react-native-timer-countdown";
import {
    getNextBeaconNoConfirm, onConfirmQRScan, resetTimer, riddleTimeOut, setBackOffProgressStatus, storeBackOffId,
    updateTimer
} from "../actions/actionsGameData";
import {default as FCM, FCMEvent} from "react-native-fcm";
import {COLORS, GAME_MODES} from "../utils/constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class QRCScreen extends React.Component {

    constructor(props) {
        super(props);
        this.handleScanResult = this.handleScanResult.bind(this);
        this.renderStars = this.renderStars.bind(this);
    }

    componentDidMount() {
        FCM.getFCMToken().then((t) => console.log(t));
        FCM.on(FCMEvent.Notification, notif => {
            console.log("notif received");
            console.log(notif);

            if(notif['confirmPoint']){ //Expected notification
                this.props.getNextBeaconNoConfirm(notif['lives']);
            }
        });
    }

    render() {
        return (

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
        return(
            <View style={styles.topView}>
                <TimerCountdown
                    initialSecondsRemaining={this.props.timerSecondsRemaining*1000}        // given in seconds
                    onTick={(secondsRemaining) => {
                        this.props.updateTimer(secondsRemaining);
                    }}
                    onTimeElapsed={() => {
                        // generate random backoff then send timeout
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

    _renderMenu() {
        return (
            <View style={styles.bottomView}>
                {this.props.showBackOffProgressStatus ?
                    <ActivityIndicator size="large" color="#ffffff"/>
                    :
                    <Text
                        style={styles.riddleText}>
                        {this.props.nextBeacon.statement}
                    </Text>}
            </View>
        )
    }

    renderStars() {
        if(this.props.game.GameMode !== GAME_MODES.NORMAL){
            let stars = [];

            for(let i = this.props.game.lives; i > 0; i--) {
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
        teamInfo: state.gameDataReducer.teamInfo,
        ids: state.gameDataReducer.ids,
        nextBeacon: state.gameDataReducer.nextBeacon,
        timerSecondsRemaining: state.gameDataReducer.timerSecondsRemaining,
        showBackOffProgressStatus: state.gameDataReducer.showBackOffProgressStatus,
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        setBackOffProgressStatus: (boolean) => dispatch(setBackOffProgressStatus(boolean)),
        getNextBeaconNoConfirm: (updatedLives) => dispatch(getNextBeaconNoConfirm(updatedLives)),
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

