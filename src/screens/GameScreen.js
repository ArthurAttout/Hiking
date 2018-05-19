import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import MapView, { Marker } from 'react-native-maps'
import {getNextBeacon} from "../config/FakeServer";
import store from "../config/store";
import {joinTeam} from "../actions/actionsJoinGame";
import {setMapViewVisible, storeCurrentLocation, storeNextBeacon, storeServerData} from "../actions/actionsGameData";

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
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
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
                    accuracy: 0,
                    error: error.message,
                };
                this.props.storeCurrentLocation(currentPosition);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
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

    // TODO rotate arrow based on next beacon location
    renderMainView() {
        if(!this.props.mapViewVisible){
            return (
                /* For testing only
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate('EndGameScreen');
                    }}
                >*/
                <View style={styles.map}>
                    <FontAwesomeIcon size={200} color={COLORS.Primary} name="location-arrow"/>
                </View>
                //</TouchableNativeFeedback>
            );
        } else {
            this.initialRegion = {
                latitude: this.props.currentLocation.latitude,
                longitude: this.props.currentLocation.longitude,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0,
            };
            console.log(this.initialRegion);
            console.log(this.props.nextBeacon);
            const beacon = {
                latitude: this.props.nextBeacon.latitude,
                longitude: this.props.nextBeacon.longitude,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0
            };
            console.log(beacon);
            return (
                // TODO place next marker as well
                <MapView
                    style={styles.map}
                    initialRegion={this.initialRegion}
                >
                    <Marker coordinate={beacon} />
                </MapView>
            );
        }
    }

    renderBottomNavigation() {
        //if(this.props.gameData.mapViewEnabled){
        if(true){
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


const mapStateToProps = state => {
    return {
        playerName: state.joinGameReducer.playerName,
        gameCode: state.joinGameReducer.gameCode,
        teamName: state.joinGameReducer.teamName,
        gameData: state.gameDataReducer.gameData,
        nextBeacon: state.gameDataReducer.nextBeacon,
        currentLocation: state.gameDataReducer.currentLocation,
        mapViewVisible: state.gameDataReducer.mapViewVisible
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        storeCurrentLocation: (currentLocation) => dispatch(storeCurrentLocation(currentLocation)),
        setMapViewVisible: (mapViewVisible) => dispatch(setMapViewVisible(mapViewVisible)),
    }
};

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
        justifyContent: 'center'
    },
});

