import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import MapView, { Marker, Circle } from 'react-native-maps'
import {
    setMapViewVisible, storeCurrentLocation, storeBearing,
    checkPlayerInsideBeacon, shrinkZone, refreshPosition, storeTimerIds, onRegionChange,
    onCloseOutOfZoneModal, getLastBeacon
} from "../actions/actionsGameData";
import OutOfZoneModal from "./PlayerBeaconModals/OutOfZoneModal";

class GScreen extends React.Component {

    constructor(props) {
        super(props);
        this.renderBottomNavigation = this.renderBottomNavigation.bind(this);
        this.renderMainView = this.renderMainView.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
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
                this.props.storeBearing();
                this.props.onRegionChange(
                    {
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.0,
                        longitudeDelta: 0.0,
                    }
                )
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

        var watchID = navigator.geolocation.watchPosition((position) => {
                let updatedLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    accuracy: position.coords.accuracy
                };
                console.log(updatedLocation);
                this.props.storeCurrentLocation(updatedLocation);
                this.props.storeBearing();
                this.props.checkPlayerInsideBeacon();
            },
            (error) => {
                const currentPosition = {
                    error: error.message,
                };
                this.props.storeCurrentLocation(currentPosition);
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1
            },
        );

        var shrinkIntervalID = undefined;
        if(this.props.settings.tresholdShrink !== 0) {
            shrinkIntervalID = setInterval(() => {
                this.props.shrinkZone()
            }, 60000);
        }

        var refreshIntervalID = setInterval(() => {this.props.refreshPosition()}, 30000);

        let ids = {
            watchId: watchID,
            shrinkIntervalID: shrinkIntervalID,
            refreshIntervalID: refreshIntervalID
        };
        this.props.storeTimerIds(ids);

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.props.ids.watchId);
        if(this.props.settings.tresholdShrink !== 0) {
            this.clearInterval(this.props.ids.shrinkIntervalID);
        }
        this.clearInterval(this.props.ids.refreshIntervalID);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
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
            const beacon = {
                latitude: this.props.nextBeacon.latitude,
                longitude: this.props.nextBeacon.longitude,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0
            };
            return (
                <MapView
                    style={styles.map}
                    region={this.props.centerRegion}
                    followUserLocation={true}
                    //showsMyLocationButton={true}
                    onRegionChangeComplete={(evt) => {this.props.onRegionChange(evt)}}>
                    <Marker
                        coordinate={{
                            latitude: this.props.currentLocation.latitude,
                            longitude: this.props.currentLocation.longitude,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.0,
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
                getLastBeacon={this.props.getLastBeacon}/>
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
        centerRegion: state.gameDataReducer.centerRegion,
        ids: state.gameDataReducer.ids,
        outOfZoneModalVisible: state.gameDataReducer.outOfZoneModalVisible
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
        storeTimerIds: () => dispatch(storeTimerIds()),
        onRegionChange: (evt) => dispatch(onRegionChange(evt)),
        onCloseOutOfZoneModal: () => dispatch(onCloseOutOfZoneModal()),
        getLastBeacon: () => dispatch(getLastBeacon())
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

