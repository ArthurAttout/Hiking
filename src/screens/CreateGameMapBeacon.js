import {Marker} from 'react-native-maps';
import MapView,{Polyline} from 'react-native-maps';
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import { View,StyleSheet } from 'react-native';
import Menu from './CreateGameMapMenuDrawer'
import {
    dragBeacon, setupInitialMap, addBeacon, startTracking, touchBeacon, addNewTrack, onCenterRegionChange,onDeleteTrack,
    onEditTrack
} from "../actions/actionsCreateGameMap";
import {connect} from "react-redux";
import {COLORS} from '../utils/constants'
import SideMenu from 'react-native-side-menu'

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
        const menu = <Menu
            navigator={navigator}
            userTracks={this.props.tracks}
            onAddNewTrack={() => {this.props.addNewTrack()}}
            onEditTrack={(track) => {this.props.onEditTrack(track)}}
            onDeleteTrack={(track) => {this.props.onDeleteTrack(track)}}/>;
        return(
            <SideMenu
                menu={menu}
                menuPosition='right'>
                <View
                    style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={this.props.centerRegion}
                        onRegionChange={(evt) => {this.props.onCenterRegionChange(evt)}}>
                        {
                            this.props.currentTrack.beacons.map((beacon) => (
                                <Marker
                                    key={JSON.stringify(beacon.id)}
                                    draggable
                                    coordinate={beacon.coordinate}
                                    onPress={() => {this.props.touchBeacon(beacon)}}
                                    onDragEnd={(evt) => this.props.dragBeacon(beacon,evt.nativeEvent.coordinate)}/>
                            ))
                        }
                        <Polyline
                            coordinates={this.props.currentTrack.path}
                            strokeColor={COLORS.Primary}
                            strokeWidth={6}
                        />
                    </MapView>
                    <BottomNavigation
                        labelColor="white"
                        rippleColor="white"
                        style={{
                            height: 56,
                            elevation: 8,
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            right: 0
                        }}>
                        <Tab
                            barBackgroundColor={COLORS.Primary}
                            label="New"
                            onPress={this.props.addNewBeacon}
                            icon={<Icon size={24} color="white" name="pin-drop" />}
                        />
                        <Tab
                            barBackgroundColor={COLORS.Secondary}
                            label="Link"
                            onPress={this.props.startTracking}
                            icon={<Icon size={24} color="white" name="timeline" />}
                        />
                    </BottomNavigation>
                </View>
            </SideMenu>
        );
    }

    componentDidMount(){
        this.props.setupInitialMap();
    }
}
const mapStateToProps = (state, own) => {
    return {
        ...own,
        centerRegion : state.createGameMapReducer.centerRegion,
        currentTrack:state.createGameMapReducer.currentTrack,
        tracks: state.createGameMapReducer.tracks,
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        setupInitialMap: () => dispatch(setupInitialMap()),
        dragBeacon: (original,coord) => dispatch(dragBeacon(original,coord)),
        addNewBeacon:() => dispatch(addBeacon()),
        startTracking:(evt) => dispatch(startTracking(evt)),
        touchBeacon:(evt,beacon) => dispatch(touchBeacon(evt,beacon)),
        addNewTrack:() => dispatch(addNewTrack()),
        onCenterRegionChange:(evt) => dispatch(onCenterRegionChange(evt)),
        onDeleteTrack:(track)=> dispatch(onDeleteTrack(track)),
        onEditTrack:(track) => dispatch(onEditTrack(track))
    }
}

//Connect everything
export default CreateGameMapBeacon = connect(mapStateToProps, mapDispatchToProps)(Screen);


