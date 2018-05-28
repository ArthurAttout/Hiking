import React from 'react';
import {
    AppRegistry, Text, View, StyleSheet, TouchableNativeFeedback, StatusBar, Image,
    BackHandler, DeviceEventEmitter, ToastAndroid, Alert
} from 'react-native';
import { registerKilledListener } from "../config/firebase/Listeners";
import {COLORS} from '../utils/constants'
import {connect} from "react-redux";
import {storeCurrentLocation} from "../actions/actionsGameData";
import FCM, {FCMEvent} from "react-native-fcm";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import store from "../config/store";

class HScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this._onPressJoinGame = this._onPressJoinGame.bind(this);
        this._onPressNewGame = this._onPressNewGame.bind(this);
    }

    componentWillUnmount() {
        LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener
    }

    componentWillMount() {

        FCM.on(FCMEvent.Notification, notif => {

                FCM.presentLocalNotification({
                    title: notif.fcm.title,
                    body: notif.fcm.body,
                    show_in_foreground: true});

        });
        console.log("aaaaa");

        DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
            console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#558b2f"
                    barStyle="light-content"
                />
                <Image
                    style={{height: '50%', resizeMode: 'contain'}}
                    source={require('../images/logo_512.png')}/>
                <View style={styles.codesView}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        delayPressIn={0}
                        style={styles.button}
                        onPress={this._onPressJoinGame}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>JOIN GAME</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.separator}/>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        delayPressIn={0}
                        onPress={this._onPressNewGame}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NEW GAME</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.copyrightView}>
                    <Text style={styles.copyrightText}>COPYRIGHT AtBoLo Team 2018</Text>
                </View>
            </View>
        );
    }

    _onPressJoinGame() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
            preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
            providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        }).then(function(success) {
                // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
                        const currentPosition = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            altitude: position.coords.altitude,
                            heading: position.coords.heading,
                            speed: position.coords.speed,
                            accuracy: position.coords.accuracy,
                            error: null,
                        };

                        this.props.storeCurrentLocation(currentPosition);
                    },
                    // TODO manage error when GPS is not activated
                    (error) => {
                        const currentPosition = {
                            error: error.message,
                        };
                        this.props.storeCurrentLocation(currentPosition);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 1000
                    },
                );
                const { navigate } = this.props.navigation;
                navigate('JoinGameScreen');
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
            ToastAndroid.show('Location services required, please enable them!',ToastAndroid.LONG);
        });
    }

    _onPressNewGame() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
            preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
            providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        }).then(function(success) {
                // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
                        const currentPosition = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            altitude: position.coords.altitude,
                            heading: position.coords.heading,
                            speed: position.coords.speed,
                            accuracy: position.coords.accuracy,
                            error: null,
                        };

                        this.props.storeCurrentLocation(currentPosition);
                    },
                    // TODO manage error when GPS is not activated
                    (error) => {
                        const currentPosition = {
                            error: error.message,
                        };
                        this.props.storeCurrentLocation(currentPosition);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 1000
                    },
                );
                const { navigate } = this.props.navigation;
                navigate('ChooseModeScreen');
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
            ToastAndroid.show('Location services required, please enable them!',ToastAndroid.LONG);
        });
    }
}

const mapStateToProps = (state,own) =>{
    return{
        ...own,
        startGameNowRegistered: state.notificationsReducer.startGameNowRegistered
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        storeCurrentLocation: (currentLocation) => dispatch(storeCurrentLocation(currentLocation)),
    }
};

//Connect everything
export default HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    codesView: {
        width: '80%',
        height: 200,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '70%',
        alignItems: 'center',
        backgroundColor: COLORS.Secondary,
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 17,
        margin: 15,
    },
    separator: {
        backgroundColor: COLORS.Secondary,
        height: 5,
        width: '90%',
    },
    copyrightView: {
        position: 'absolute',
        bottom:10,
    },
    copyrightText: {
        color: '#a4a4a4',
    },
});

