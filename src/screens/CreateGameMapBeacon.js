import MapView from 'react-native-maps';
import React from "react";
import {
    setLives,
    setShrinkDelay, setTimerMaxRiddle, switchDropDistanceVisible,
    switchMapEnabled, switchNextBeaconVisibility
} from "../actions/actionsSettingsGame";
import {connect} from "react-redux";

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
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


