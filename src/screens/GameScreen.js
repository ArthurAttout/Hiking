import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import MapView, { Marker } from 'react-native-maps'
import {getNextBeacon} from "../config/FakeServer";
import store from "../config/store";

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

        this.state = {
            teamName: 'TeamName',
            mapViewVisible: false,
            latitude: 0.0,
            longitude: 0.0,
            accuracy: null,
            error: null,
            nextBeacon: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    error: null,
                });
            },
            // TODO manage error when GPS is not activated
            (error) => {
                this.setState({
                    latitude: 50.228411,
                    longitude: 5.335913,
                    accuracy: 0,
                    error: error.message
                })
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        // TODO get initial next beacon and store it in the state
        /*this.setState(() => {
            return { nextBeacon: this.props.nextBeacon};
        });*/

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
        if(!this.state.mapViewVisible){
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
                latitude: 50.223777,
                longitude: 5.335017,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            };
            console.log(this.initialRegion);
            return (
                // TODO place next marker as well
                <MapView
                    style={styles.map}
                    initialRegion={this.initialRegion}
                />
                    /*<Marker coordinate={{
                            latitude: this.state.nextBeacon.latitude,
                            longitude: this.state.nextBeacon.longitude
                            latitude: 0,
                            longitude: 0
                        }} />*/
                //</MapView>
            );
        }
    }

    renderBottomNavigation() {
        //if(this.props.gameData.mapViewEnabled){
        if(true){
            if(this.state.mapViewVisible) {
                return (
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={() => {
                            this.setState({
                                mapViewVisible: false
                            });
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
                            this.setState({
                                mapViewVisible: true
                            });
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
    }
};

//Connect everything
export default GameScreen = connect(mapStateToProps)(GScreen);

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

