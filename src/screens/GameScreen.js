import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import MapView, { Marker } from 'react-native-maps'
import {
    setMapViewVisible, storeCurrentLocation, storeNextBeacon, storeBearing,
    checkPlayerInsideBeacon
} from "../actions/actionsGameData";

class GScreen extends React.Component {
    static navigationOptions = {
        header: null
        // TODO find fix to replace with team name from redux
        /*title: 'TeamName',
        headerStyle: {
            backgroundColor: COLORS.Primary
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerLeft: null*/
    };

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
            },
            // TODO manage error when GPS is not activated
            (error) => {
                const currentPosition = {
                    latitude: 50.228411,
                    longitude: 5.335913,
                    altitude: 0,
                    heading: 0,
                    speed: 0,
                    accuracy: 0,
                    error: error.message,
                };
                this.props.storeCurrentLocation(currentPosition);
                this.props.storeBearing();
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            },
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
            // TODO manage when current location is inside the beacon zone
                let updatedLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    accuracy: position.coords.accuracy
                };
                this.props.storeCurrentLocation(updatedLocation);
                this.props.storeBearing();
                this.props.checkPlayerInsideBeacon();
                console.log(this.props.isPlayerInsideBeacon);
                // TODO when true launch beacon screen (based on game mode) and get the next beacon
                if(this.props.isPlayerInsideBeacon === true){
                    const { navigate } = this.props.navigation;
                    navigate('BeaconScreen');
                }
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

        //TODO store whatid
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
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
            </View>
        );
    }


    renderMainView() {
        if(!this.props.mapViewVisible){
            // TODO rotate arrow based on next beacon location
            return (
                /*For testing only
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate('EndGameScreen');
                    }}
                >*/
                <View style={styles.map}>
                    <FontAwesomeIcon style={ {transform: [{ rotate: (this.props.bearing+'deg')}]} } size={200} color={COLORS.Primary} name="location-arrow"/>
                </View>
                //</TouchableNativeFeedback>
            );
        } else {
            const beacon = {
                latitude: this.props.nextBeacon.latitude,
                longitude: this.props.nextBeacon.longitude,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0
            };
            return (
                // TODO place next marker as well
                <MapView
                    style={styles.map}
                    region={
                        {
                            latitude: this.props.currentLocation.latitude,
                            longitude: this.props.currentLocation.longitude,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.0,
                        }
                    }
                    followUserLocation={true}
                    showsMyLocationButton={true}
                >
                    <Marker
                        coordinate={{
                            latitude: this.props.currentLocation.latitude,
                            longitude: this.props.currentLocation.longitude,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.0,
                        }}
                        image={require('../images/ic_directions_walk_black.png')}
                    />
                    <Marker coordinate={beacon}/>
                </MapView>
            );
        }
    }

    renderBottomNavigation() {
        if(this.props.gameData.mapViewEnabled){
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
}


const mapStateToProps = (state, own) => {
    return {
        ...own,
        playerName: state.joinGameReducer.playerName,
        gameCode: state.joinGameReducer.gameCode,
        teamName: state.joinGameReducer.teamName,
        gameData: state.gameDataReducer.gameData,
        nextBeacon: state.gameDataReducer.nextBeacon,
        currentLocation: state.gameDataReducer.currentLocation,
        mapViewVisible: state.gameDataReducer.mapViewVisible,
        bearing: state.gameDataReducer.bearing,
        isPlayerInsideBeacon: state.gameDataReducer.isPlayerInsideBeacon
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        storeCurrentLocation: (currentLocation) => dispatch(storeCurrentLocation(currentLocation)),
        setMapViewVisible: (mapViewVisible) => dispatch(setMapViewVisible(mapViewVisible)),
        storeNextBeacon: (nextBeacon) => dispatch(storeNextBeacon(nextBeacon)),
        storeBearing: () => dispatch(storeBearing()),
        checkPlayerInsideBeacon: () => dispatch(checkPlayerInsideBeacon())
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

