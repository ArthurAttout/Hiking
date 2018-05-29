import React from 'react';
import Modal from "react-native-modal";
import {StyleSheet, View, Dimensions, Vibration, Text} from 'react-native';
import TimerCountdown from 'react-native-timer-countdown'
import {GLOBAL_SETTINGS} from "../../utils/constants";

export default class OutOfZoneModal extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        if(this.props.isSubmitButtonPressed) {
            Vibration.vibrate([5000, 1000], true);
        }

        return(
            <Modal
                onBackdropPress={() => {}}
                isVisible={this.props.modalVisible}>

                <View style={styles.container}>
                    <View  style={styles.textView}>
                        <Text style={styles.text}>{"You're out of the safe zone!"}</Text>
                        <Text style={styles.subText}>{"Hurry back in the zone before you are eliminated!"}</Text>
                    </View>
                    <View  style={styles.countdownView}>
                        <TimerCountdown
                            initialSecondsRemaining={this.props.outOfZoneTimerSeconds}
                            onTick={(secondsRemaining) => {
                                this.props.updateOutOfZoneTimer(secondsRemaining);
                            }}
                            onTimeElapsed={() => {
                                Vibration.cancel();
                                this.props.setGameOver()
                                this.props.resetOutOfZoneTimer();
                                this.props.getLastBeacon();
                            }}
                            allowFontScaling={true}
                            style={styles.countdownTimer}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        //height:'35%',
        //width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height * 0.35),
        backgroundColor:'#ffffff',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    textView:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'column'
        //width:'100%',
        //height:'100%'
    },
    text:{
        //width: '100%',
        fontSize: 22,
        textAlign:'center',
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10
    },
    subText:{
        //width: '100%',
        fontSize: 17,
        textAlign:'center',
    },
    countdownView:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        //width:'100%',
        //height:'100%'
    },
    countdownTimer:{
        fontSize: 75,
        color: 'red',

    },
});