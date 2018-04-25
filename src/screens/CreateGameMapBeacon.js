import {Marker} from 'react-native-maps';
import MapView,{Polyline} from 'react-native-maps';
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import { View,StyleSheet } from 'react-native';
import Menu from './CreateGameMapMenuDrawer'
import {
    dragBeacon, setupInitialMap, addBeacon, startTracking, touchBeacon, onCenterRegionChange,
    onClearLinkedPath, onConfirmLinkedPath, changeSideMenuOpened,
} from "../actions/actionsCreateGameMap";

import {onFocusOnBeacon,addNewTrack,onDeleteTrack,onEditTrack,onClearBeacons,
        onEditTrackName,trackNameChanged,onSubmitTrackName,onCloseModal,onRequestModal,
        setImagePath,onCancelCustomizeBeacon,setCurrentBeaconName, onConfirmCustomizeBeacon
} from "../actions/actionsCreateGameMapDrawer";

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
    bottomNavigation:{
        height: 56,
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
    }
});

class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.renderMarker = this.renderMarker.bind(this);
        this.renderBottomNavigation = this.renderBottomNavigation.bind(this);
    }

    render(){
        const menu = <Menu
            navigator={navigator}
            userTracks={this.props.tracks}
            currentTrackID={this.props.currentTrack.id}
            setImagePath={(path) => {this.props.setImagePath(path)}}
            onAddNewTrack={() => {this.props.addNewTrack()}}
            onEditTrackName={(track) => {this.props.onEditTrackName(track)}}
            onTrackNameChanged={(track,newName) => {this.props.onTrackNameChanged(track,newName)}}
            onSubmitTrackName={(track) => {this.props.onSubmitTrackName(track)}}
            onEditTrack={(track) => {this.props.onEditTrack(track)}}
            onClearBeacons={(track) => {this.props.onClearBeacons(track)}}
            onFocusOnBeacon={(beacon) => {this.props.onFocusOnBeacon(beacon)}}
            onDeleteTrack={(track) => {this.props.onDeleteTrack(track)}}
            onCloseModal={() => {this.props.onCloseModal()}}
            onCancelCustomizeBeacon={(beacon) => {this.props.onCancelCustomizeBeacon(beacon)}}
            onRequestModal={(beacon)=>{this.props.onRequestModal(beacon)}}
            currentCustomizingBeacon={this.props.currentCustomizingBeacon}
            onConfirmCustomizeBeacon={()=>{this.props.onConfirmCustomizeBeacon()}}
            setCurrentBeaconName={(name)=>{this.props.setCurrentBeaconName(name)}}
            modalVisible={this.props.modalVisible}/>;
        return(
            <SideMenu
                menu={menu}
                isOpen={this.props.sideMenuOpened}
                onChange={(state) => {this.props.changeSideMenuOpened(state)}}
                menuPosition='right'>
                <View
                    style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={this.props.centerRegion}
                        onRegionChange={(evt) => {this.props.onCenterRegionChange(evt)}}>
                        {
                            this.props.currentTrack.beacons.map((beacon,index,array) => this.renderMarker(beacon,index,array))
                        }
                        <Polyline
                            coordinates={this.props.currentTrack.path}
                            strokeColor={COLORS.Primary}
                            strokeWidth={6}
                        />
                    </MapView>
                    {this.renderBottomNavigation()}
                </View>
            </SideMenu>
        );
    }

    renderBottomNavigation(){
        if(this.props.confirmLinkedBeacons){
            return(
                <BottomNavigation
                    labelColor="white"
                    rippleColor="white"
                    style={styles.bottomNavigation}>
                    <Tab
                        barBackgroundColor={COLORS.Primary}
                        label="Cancel"
                        onPress={() => {this.props.clearLinkedPath()}}
                        icon={<Icon size={24} color="white" name="clear" />}
                    />
                    <Tab
                        barBackgroundColor={COLORS.Secondary}
                        label="Confirm"
                        onPress={() => {this.props.confirmLinkedPath()}}
                        icon={<Icon size={24} color="white" name="check" />}
                    />
                </BottomNavigation>
            )
        }
        else
        {
            return(
                <BottomNavigation
                    labelColor="white"
                    rippleColor="white"
                    style={styles.bottomNavigation}>
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
            )
        }
    }

    renderMarker(beacon,index,array){
        if(index === 0 || array.length === 1){ //Starting point icon
            return(
                <Marker
                    key={JSON.stringify(beacon.id)}
                    draggable
                    coordinate={beacon.coordinate}
                    image={require('../images/ic_directions_walk_black.png')}
                    onPress={() => {this.props.touchBeacon(beacon)}}
                    onDragEnd={(evt) => this.props.dragBeacon(beacon,evt.nativeEvent.coordinate)}/>
            )
        }

        if(index === array.length-1){ //Finish line icon
            return(
                <Marker
                    key={JSON.stringify(beacon.id)}
                    draggable
                    coordinate={beacon.coordinate}
                    image={require('../images/finish.png')}
                    onPress={() => {this.props.touchBeacon(beacon)}}
                    onDragEnd={(evt) => this.props.dragBeacon(beacon,evt.nativeEvent.coordinate)}
                />
            )
        }

        return(
            <Marker
                key={JSON.stringify(beacon.id)}
                draggable
                coordinate={beacon.coordinate}
                onPress={() => {this.props.touchBeacon(beacon)}}
                onDragEnd={(evt) => this.props.dragBeacon(beacon,evt.nativeEvent.coordinate)}/>
        )
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
        confirmLinkedBeacons:state.createGameMapReducer.confirmLinkedBeacons,
        sideMenuOpened:state.createGameMapReducer.sideMenuOpened,
        modalVisible:state.createGameMapReducer.modalVisible,
        currentCustomizingBeacon: state.createGameMapReducer.currentCustomizingBeacon
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        setupInitialMap: () => dispatch(setupInitialMap()),
        changeSideMenuOpened:(state) => dispatch(changeSideMenuOpened(state)),

        dragBeacon: (original,coord) => dispatch(dragBeacon(original,coord)),
        addNewBeacon:() => dispatch(addBeacon()),
        startTracking:(evt) => dispatch(startTracking(evt)),
        touchBeacon:(evt,beacon) => dispatch(touchBeacon(evt,beacon)),
        addNewTrack:() => dispatch(addNewTrack()),
        onCenterRegionChange:(evt) => dispatch(onCenterRegionChange(evt)),

        //Drawer
        onDeleteTrack:(track)=> dispatch(onDeleteTrack(track)),
        onEditTrack:(track) => dispatch(onEditTrack(track)),
        onEditTrackName:(track) => dispatch(onEditTrackName(track)),
        onClearBeacons:(track) => dispatch(onClearBeacons(track)),
        onTrackNameChanged:(track,newName) => dispatch(trackNameChanged(track,newName)),
        onSubmitTrackName: (track) => dispatch(onSubmitTrackName(track)),
        onFocusOnBeacon: (beacon) => dispatch(onFocusOnBeacon(beacon)),
        onCloseModal:() => dispatch(onCloseModal()),
        onRequestModal:(beacon) => dispatch(onRequestModal(beacon)),
        setImagePath:(path) => dispatch(setImagePath(path)),
        setCurrentBeaconName:(name) => dispatch(setCurrentBeaconName(name)),
        onCancelCustomizeBeacon:(beacon) => dispatch(onCancelCustomizeBeacon(beacon)),
        onConfirmCustomizeBeacon:()=>dispatch(onConfirmCustomizeBeacon()),

        clearLinkedPath:() => dispatch(onClearLinkedPath()),
        confirmLinkedPath:() => dispatch(onConfirmLinkedPath())
    }
}

//Connect everything
export default CreateGameMapBeacon = connect(mapStateToProps, mapDispatchToProps)(Screen);


