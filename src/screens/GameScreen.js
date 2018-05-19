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
import {setMapViewVisible, storeCurrentLocation, storeNextBeacon} from "../actions/actionsGameData";

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

        //const nextBeacon = getNextBeacon(this.props.gameCode, this.props.teamName);
        this.props.storeNextBeacon(getNextBeacon(this.props.gameCode, this.props.teamName));
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.Primary_accent}
                    barStyle="light-content"
                />
                {this.renderMainView(this.props)}
                {this.renderBottomNavigation(this.props)}
            </View>
        );
    }

    // TODO rotate arrow based on next beacon location
    renderMainView(props) {
        if(!props.mapViewVisible){
            return (
                //For testing only
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={() => {
                        /*const { navigate } = this.props.navigation;
                        navigate('EndGameScreen');*/
                        console.log(this.props.nextBeacon);
                        console.log(this.props.currentLocation);
                    }}
                >
                <View style={styles.map}>
                    <FontAwesomeIcon size={200} color={COLORS.Primary} name="location-arrow"/>
                </View>
                </TouchableNativeFeedback>
            );
        } else {
            this.initialRegion = {
                latitude: props.currentLocation.latitude,
                longitude: props.currentLocation.longitude,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0,
            };
            console.log(this.initialRegion);
            //console.log(props.nextBeacon);
            const beacon = {
                latitude: props.nextBeacon.latitude,
                longitude: props.nextBeacon.longitude,
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

    renderBottomNavigation(props) {
        //if(this.props.gameData.mapViewEnabled){
        if(true){
            if(props.mapViewVisible) {
                return (
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={() => {
                            props.setMapViewVisible(false);
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
                            props.setMapViewVisible(true);
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
        mapViewVisible: state.gameDataReducer.mapViewVisible
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        storeCurrentLocation: (currentLocation) => dispatch(storeCurrentLocation(currentLocation)),
        setMapViewVisible: (mapViewVisible) => dispatch(setMapViewVisible(mapViewVisible)),
        storeNextBeacon: (nextBeacon) => dispatch(storeNextBeacon(nextBeacon))
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

