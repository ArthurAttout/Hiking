import MapView from 'react-native-maps';
import React from "react";
import { View,StyleSheet } from 'react-native';
import {
    setLives,
    setShrinkDelay, setTimerMaxRiddle, switchDropDistanceVisible,
    switchMapEnabled, switchNextBeaconVisibility
} from "../actions/actionsSettingsGame";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    map: {
        height: '100%',
        width: '100%',
    },
});

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
           <View
           style={styles.container}>
               <MapView
                   style={styles.map}
                   region={{
                       latitude: 50.223777,
                       longitude: 5.335017,
                       latitudeDelta: 0.015,
                       longitudeDelta: 0.0121,
                   }}
               />
           </View>
        );
    }
}
const mapStateToProps = (state, own) => {
    return {
        ...own,
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
    }
}

//Connect everything
export default CreateGameMapBeacon = connect(mapStateToProps, mapDispatchToProps)(Screen);


