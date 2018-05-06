import {Marker} from 'react-native-maps';
import MapView,{Polyline} from 'react-native-maps';
import { QRScannerView } from 'ac-qrcode';
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import {View, StyleSheet, Text, TouchableNativeFeedback} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Menu from './CreateGameMapMenuDrawer'
import {
    dragBeacon, setupInitialMap, addBeacon, startTracking, touchBeacon, onCenterRegionChange,
    onClearLinkedPath, onConfirmLinkedPath, changeSideMenuOpened,
} from "../actions/actionsCreateGameMap";

import {
    onFocusOnBeacon, addNewTrack, onDeleteTrack, onEditTrack, onClearBeacons,
    onEditTrackName, trackNameChanged, onSubmitTrackName, onCloseModal, onRequestModal,
    setImagePath, onCancelCustomizeBeacon, setCurrentBeaconName, onConfirmCustomizeBeacon,
    addCustomRiddle, addRandomRiddle, submitCustomRiddle, submitRandomRiddle, setCurrentBeaconRiddleAnswer,
    setCurrentBeaconRiddleStatement, requestNewRandomRiddle, showQRCodePicker,closeQRCodePicker,setCurrentBeaconQRCode,
    showModalBeaconID,closeModalBeaconID
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
            chosenMode={this.props.chosenMode}
            navigation={this.props.navigation}
            userTracks={this.props.tracks}
            currentTrackID={this.props.currentTrack.id}
            setImagePath={this.props.setImagePath}
            userCanFinish={this.props.userCanFinish}

            QRCodePickerVisible={this.props.QRCodePickerVisible}
            showQRCodePicker={this.props.showQRCodePicker}
            closeQRCodePicker={this.props.closeQRCodePicker}
            setCurrentBeaconQRCode={this.props.setCurrentBeaconQRCode}
            showModalBeaconID={this.props.showModalBeaconID}
            closeModalBeaconID={this.props.closeModalBeaconID}
            modalBeaconIDVisible={this.props.modalBeaconIDVisible}

            addRandomRiddle={this.props.addRandomRiddle}
            addCustomRiddle={this.props.addCustomRiddle}
            submitCustomRiddle={this.props.submitCustomRiddle}
            submitRandomRiddle={this.props.submitRandomRiddle}
            setCurrentBeaconRiddleStatement={this.props.setCurrentBeaconRiddleStatement}
            setCurrentBeaconRiddleAnswer={this.props.setCurrentBeaconRiddleAnswer}
            showModalRandomRiddle={this.props.showModalRandomRiddle}
            showModalCustomRiddle={this.props.showModalCustomRiddle}
            requestNewRandomRiddle={this.props.requestNewRandomRiddle}

            onAddNewTrack={this.props.addNewTrack}
            onEditTrackName={this.props.onEditTrackName}
            onTrackNameChanged={this.props.onTrackNameChanged}
            onSubmitTrackName={this.props.onSubmitTrackName}
            onEditTrack={this.props.onEditTrack}
            onDeleteTrack={this.props.onDeleteTrack}

            onClearBeacons={this.props.onClearBeacons}
            onFocusOnBeacon={this.props.onFocusOnBeacon}
            onCloseModal={this.props.onCloseModal}
            onCancelCustomizeBeacon={this.props.onCancelCustomizeBeacon}
            currentCustomizingBeacon={this.props.currentCustomizingBeacon}
            onConfirmCustomizeBeacon={this.props.onConfirmCustomizeBeacon}
            setCurrentBeaconName={this.props.setCurrentBeaconName}

            onRequestModal={this.props.onRequestModal}
            modalVisible={this.props.modalVisible}/>;

        if(this.props.QRCodePickerVisible){
            return(<QRScannerView
                hintText={"Scan your code"}
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
            />)
        }
        else {
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

    _renderTitleBar(){
        return(
            <IconAwesome.Button
                name="close"
                visible={false}
                style={{width:'20%',height:'15%',margin:15,alignSelf:'center'}}
                color="transparent"
                onPress={()=>{}}
                backgroundColor='transparent'
                background={TouchableNativeFeedback.Ripple('blue')}
                delayPressIn={0}/>
        );
    }

    _renderMenu() {
        return (
            <IconAwesome.Button
                name="close"
                style={{width:'20%',height:'15%',margin:15,alignSelf:'center'}}
                color="#ffffff"
                onPress={this.props.closeQRCodePicker}
                backgroundColor='transparent'
                background={TouchableNativeFeedback.Ripple('blue')}
                delayPressIn={0}/>
        )
    }

    barcodeReceived(e) {
        setCurrentBeaconQRCode(e.data);
    }
}
const mapStateToProps = (state, own) => {
    return {
        ...own,
        centerRegion : state.createGameMapReducer.centerRegion,
        currentTrack:state.createGameMapReducer.currentTrack,
        chosenMode: state.settingsReducer.chosenMode,
        userCanFinish: state.createGameMapReducer.userCanFinish,
        tracks: state.createGameMapReducer.tracks,
        confirmLinkedBeacons:state.createGameMapReducer.confirmLinkedBeacons,
        sideMenuOpened:state.createGameMapReducer.sideMenuOpened,

        //Drawer
        modalVisible:state.createGameMapReducer.modalVisible,
        currentCustomizingBeacon: state.createGameMapReducer.currentCustomizingBeacon,
        showModalCustomRiddle: state.createGameMapReducer.showModalCustomRiddle,
        showModalRandomRiddle: state.createGameMapReducer.showModalRandomRiddle,
        modalBeaconIDVisible: state.createGameMapReducer.modalBeaconIDVisible,
        QRCodePickerVisible: state.createGameMapReducer.QRCodePickerVisible
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
        clearLinkedPath:() => dispatch(onClearLinkedPath()),
        confirmLinkedPath:() => dispatch(onConfirmLinkedPath()),

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

        addRandomRiddle:()=>{dispatch(addRandomRiddle())},
        addCustomRiddle:()=>{dispatch(addCustomRiddle())},
        requestNewRandomRiddle:()=>{dispatch(requestNewRandomRiddle())},
        submitCustomRiddle:()=>{dispatch(submitCustomRiddle())},
        submitRandomRiddle:()=>{dispatch(submitRandomRiddle())},
        setCurrentBeaconRiddleAnswer:(ans)=>{dispatch(setCurrentBeaconRiddleAnswer(ans))},
        setCurrentBeaconRiddleStatement:(stat)=>{dispatch(setCurrentBeaconRiddleStatement(stat))},
        setCurrentBeaconQRCode:(code)=>{dispatch(setCurrentBeaconQRCode(code))},

        closeQRCodePicker: () => {dispatch(closeQRCodePicker())},
        showQRCodePicker: () => {dispatch(showQRCodePicker())},
        showModalBeaconID: () => {dispatch(showModalBeaconID())},
        closeModalBeaconID: () => {dispatch(closeModalBeaconID())},
    }
}

//Connect everything
export default CreateGameMapBeacon = connect(mapStateToProps, mapDispatchToProps)(Screen);


