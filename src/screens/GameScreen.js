import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import MapView, { Marker } from 'react-native-maps';

class GScreen extends React.Component {
    static navigationOptions = {
        title: 'TeamName',      // TODO replace with team name from redux
        headerStyle: {
            backgroundColor: COLORS.Primary
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerLeft: null
    };

    constructor(props) {
        super(props);

        this.state = {
            teamName: 'TeamName',
            mapViewEnabled: true,
            mapViewVisible: false,
            latitude: null,
            longitude: null,
            accuracy: null,
            error: null,
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
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#255d00"
                    barStyle="light-content"
                />
                {this.renderMainView()}
                {this.renderBottomNavigation()}
            </View>
        );
    }

    renderMainView() {
        if(!this.state.mapViewVisible){
            return (
                <View style={styles.map}>
                    <FontAwesomeIcon size={200} color={COLORS.Primary} name="location-arrow"/>
                </View>
            );
        } else {
            return (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                    }}
                >
                    <Marker coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}} />
                </MapView>
            );
        }
    }

    renderBottomNavigation() {
        if(this.state.mapViewEnabled){
            return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('white')}
                onPress={() => {
                    if(this.state.mapViewVisible === true) {
                        this.setState({
                            mapViewVisible: false
                        });
                    } else {
                        this.setState({
                            mapViewVisible: true
                        });
                    }
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


const mapStateToProps = state => {
    return {
        gameCode: state.joinGameReducer.gameCode,
        playerName: state.joinGameReducer.playerName,
        teamName: state.joinGameReducer.teamName,
        // TODO get whether mapView is enabled from server
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

