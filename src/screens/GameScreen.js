import React from 'react';
import {
    AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback,
    ActivityIndicator, BackHandler, ToastAndroid
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS, GLOBAL_SETTINGS} from "../utils/constants";
import MapView, { Marker, Circle } from 'react-native-maps'
import {
    setMapViewVisible, storeCurrentLocation, storeBearing,
    checkPlayerInsideBeacon, shrinkZone, refreshPosition, storeTimerIds, onRegionChange,
    onCloseOutOfZoneModal, getLastBeacon, updateOutOfZoneTimer, resetOutOfZoneTimer, setGameOver,
    setCurrentLocationAcquired, currentLocationLongLoadTime
} from "../actions/actionsGameData";
import OutOfZoneModal from "./PlayerBeaconModals/OutOfZoneModal";
import FCM, {FCMEvent} from "react-native-fcm";
import {registerMessageTeam} from "../actions/notificationsActions";
import store from "../config/store";

class GScreen extends React.Component {

    constructor(props) {
        super(props);
        this.renderBottomNavigation = this.renderBottomNavigation.bind(this);
        this.renderMainView = this.renderMainView.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.props.setCurrentLocationAcquired(false);

        FCM.getFCMToken().then((t) => console.log(t));
        FCM.on(FCMEvent.Notification, notif => {
            if(notif['decrementLife']){
                this.props.updateTeamLives(notif['lives'])
            }
        });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    accuracy: position.coords.accuracy,
                    error: null,
                };
                this.props.storeCurrentLocation(currentPosition);
                this.props.storeBearing();
                this.props.onRegionChange(
                    {
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }
                );
                this.props.checkPlayerInsideBeacon();
            },
            (error) => {
                console.log(error);
                const currentPosition = {
                    error: error.message,
                };
                this.props.storeCurrentLocation(currentPosition);
                ToastAndroid.show('The GPS is taking some time, trying moving around for a better signal.', ToastAndroid.LONG);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 3600000
            },
        );

        var watchID = navigator.geolocation.watchPosition((position) => {
                let updatedLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    accuracy: position.coords.accuracy
                };
                if(this.props.currentLocation.error !== 0 &&
                    !this.props.currentLocationAcquired) {
                    this.props.onRegionChange({
                            latitude: updatedLocation.latitude,
                            longitude: updatedLocation.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,});}
                this.props.storeCurrentLocation(updatedLocation);
                this.props.storeBearing();
                this.props.checkPlayerInsideBeacon();
            },
            (error) => {
                const updatedLocation = {
                    error: error.message,
                };
                this.props.storeCurrentLocation(updatedLocation);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 1000,
                distanceFilter: 1
            },
        );

        let shrinkIntervalID = -1;
        if(this.props.settings.tresholdShrink !== 0) {
            shrinkIntervalID = setInterval(() => {
                this.props.shrinkZone()
            }, 60000);
        }

        let refreshIntervalID = setInterval(() => {this.props.refreshPosition()}, 30000);

        this.props.storeTimerIds(watchID, shrinkIntervalID, refreshIntervalID);

    }

    componentWillUnmount() {
        if(this.props.watchID !== -1){
            navigator.geolocation.clearWatch(this.props.watchID);}
        if(this.props.settings.tresholdShrink !== 0 && this.props.shrinkIntervalID !== -1) {
            this.clearInterval(this.props.shrinkIntervalID);}
        if(this.props.refreshIntervalID !== -1){
            this.clearInterval(this.props.refreshIntervalID);}
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    render() {
        /*if(!this.props.messageTeamRegistered){
            FCM.on(FCMEvent.Notification, notif => {
                if(notif['messageTeam']){ //Expected notification
                    FCM.presentLocalNotification({
                        title: notif.fcm.title,
                        body: notif.fcm.body,
                        show_in_foreground: true});
                }
            });
            this.props.registerMessageTeam();
        }*/

        return (
            (!this.props.currentLocationAcquired || this.props.showNextBeaconFetchActivity) ?
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>{"Getting your precise location.\nHang on a second..."}</Text>
                    <ActivityIndicator size="large" color={COLORS.Primary}/>
                </View>
                :
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={COLORS.Primary_accent}
                        barStyle="light-content"
                    />
                    {this.renderMainView()}
                    {this.renderBottomNavigation()}
                    {this.renderModal()}
                </View>
        );
    }


    renderMainView() {
        if(!this.props.mapViewVisible){
            return (
                <View style={styles.map}>
                    <FontAwesomeIcon style={ {transform: [{ rotate: (this.props.bearing+'deg')}]} } size={200} color={COLORS.Primary} name="location-arrow"/>
                </View>
            );
        } else {
            let beacon = {
                latitude: this.props.nextBeacon.latitude,
                longitude: this.props.nextBeacon.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
            };
            return (
                <MapView
                    style={styles.map}
                    region={this.props.centerRegion}
                    //followUserLocation={true}
                    //showsMyLocationButton={true}
                    onRegionChangeComplete={(evt) => {this.props.onRegionChange(evt)}}>
                    <Marker
                        coordinate={{
                            latitude: this.props.currentLocation.latitude,
                            longitude: this.props.currentLocation.longitude,
                            latitudeDelta: 0,
                            longitudeDelta: 0,
                        }}
                        image={require('../images/ic_directions_walk_black.png')}
                    />
                    {(this.props.nextBeacon.lastBeacon) ?
                        <Marker
                            coordinate={beacon}
                            image={require('../images/finish.png')}/>
                        :
                        <Marker coordinate={beacon}/>
                    }
                    <Circle
                        center={{
                            latitude: this.props.settings.center_x,
                            longitude: this.props.settings.center_y
                        }}
                        radius={this.props.settings.radius}
                        strokeColor={'red'}
                        strokeWidth={2}
                    />
                    <Circle
                        center={{
                            latitude: beacon.latitude,
                            longitude: beacon.longitude
                        }}
                        radius={GLOBAL_SETTINGS.BEACON_RADIUS_THRESHOLD}
                        strokeColor={'green'}
                        fillColor={'#ccffcc'}
                        strokeWidth={1}
                    />
                </MapView>
            );
        }
    }

    renderBottomNavigation() {
        if(this.props.settings.mapViewEnable){
            if(this.props.mapViewVisible) {
                return (
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={() => {
                            this.props.setMapViewVisible(false);
                        }}
                    >
                        <View style={styles.bottomView}>
                            <FontAwesomeIcon size={24} color="white" name="location-arrow"/>
                            <Text style={styles.bottomText}>Arrow</Text>
                        </View>
                    </TouchableNativeFeedback>
                );
            } else {
                return (
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={() => {
                            this.props.setMapViewVisible(true);
                        }}
                    >
                        <View style={styles.bottomView}>
                            <MaterialIcon size={24} color="white" name="map"/>
                            <Text style={styles.bottomText}>Map</Text>
                        </View>
                    </TouchableNativeFeedback>
                );
            }
        }
    }

    renderModal() {
        return(
            <OutOfZoneModal
                modalVisible={this.props.outOfZoneModalVisible}
                onCloseModal={this.props.onCloseOutOfZoneModal}
                getLastBeacon={this.props.getLastBeacon}
                outOfZoneTimerSeconds={this.props.outOfZoneTimerSeconds}
                updateOutOfZoneTimer={this.props.updateOutOfZoneTimer}
                resetOutOfZoneTimer={this.props.resetOutOfZoneTimer}
                setGameOver={this.props.setGameOver}/>
        );
    }
}


const mapStateToProps = (state, own) => {
    return {
        ...own,
        settings: state.gameDataReducer.settings,
        nextBeacon: state.gameDataReducer.nextBeacon,
        currentLocation: state.gameDataReducer.currentLocation,
        mapViewVisible: state.gameDataReducer.mapViewVisible,
        bearing: state.gameDataReducer.bearing,
        watchID: state.gameDataReducer.watchID,
        shrinkIntervalID: state.gameDataReducer.shrinkIntervalID,
        refreshIntervalID: state.gameDataReducer.refreshIntervalID,
        centerRegion: state.gameDataReducer.centerRegion,
        outOfZoneModalVisible: state.gameDataReducer.outOfZoneModalVisible,
        outOfZoneTimerSeconds: state.gameDataReducer.outOfZoneTimerSeconds,
        currentLocationAcquired: state.gameDataReducer.currentLocationAcquired,
        messageTeamRegistered: state.notificationsReducer.messageTeamRegistered,
        showNextBeaconFetchActivity: state.gameDataReducer.showNextBeaconFetchActivity
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        storeCurrentLocation: (currentLocation) => dispatch(storeCurrentLocation(currentLocation)),
        setMapViewVisible: (mapViewVisible) => dispatch(setMapViewVisible(mapViewVisible)),
        storeBearing: () => dispatch(storeBearing()),
        checkPlayerInsideBeacon: () => dispatch(checkPlayerInsideBeacon()),
        shrinkZone: () => dispatch(shrinkZone()),
        refreshPosition: () => dispatch(refreshPosition()),
        storeTimerIds: (watchID, shrinkIntervalID, refreshIntervalID, notifyUserID) =>
            dispatch(storeTimerIds(watchID, shrinkIntervalID, refreshIntervalID, notifyUserID)),
        onRegionChange: (evt) => dispatch(onRegionChange(evt)),
        onCloseOutOfZoneModal: () => dispatch(onCloseOutOfZoneModal()),
        getLastBeacon: () => dispatch(getLastBeacon()),
        updateOutOfZoneTimer: (secondsRemaining) => dispatch(updateOutOfZoneTimer(secondsRemaining)),
        resetOutOfZoneTimer: () => dispatch(resetOutOfZoneTimer()),
        setGameOver: () => dispatch(setGameOver()),
        setCurrentLocationAcquired: (boolean) => dispatch(setCurrentLocationAcquired(boolean)),
        registerMessageTeam: () => dispatch(registerMessageTeam()),
    }
}

//Connect everything
export default GameScreen = connect(mapStateToProps, mapDispatchToProps)(GScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomText:{
        color: 'white'
    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 56,
    },
});

