import React from 'react';
import PropTypes from 'prop-types';
import {COLORS, GAME_MODES} from '../utils/constants'
import Accordion from 'react-native-collapsible/Accordion';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../config/selection.json';
const IconCustom = createIconSetFromIcoMoon(icomoonConfig);
import {StyleSheet, ScrollView, TextInput,
    View, Image, Text,FlatList, TouchableNativeFeedback} from 'react-native';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker'
import SimpleModal from './CustomizeBeaconModals/SimpleModal'
import RiddleModal from "./CustomizeBeaconModals/RiddleModal";
import RiddleAndCodeModal from "./CustomizeBeaconModals/RiddleAndCodeModal";
import {setCurrentBeaconQRCode} from "../actions/actionsCreateGameMapDrawer";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'column',
    },
    flatList:{
        backgroundColor:'#f3f3f3',
        width:'100%'
    },
    header:{
        margin:3,
        height:100,
        //justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
        flexDirection:'row',
        backgroundColor:COLORS.Secondary,
    },
    headerCurrentTrack:{
        margin:3,
        height:100,
        //justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
        flexDirection:'row',
        backgroundColor:COLORS.Primary_accent,
    },
    title:{
        textDecorationLine:'underline',
        textAlign:'center',
        fontSize:30,
        paddingBottom:30,
        color:"#000000"
    },
    text:{
        color:"#ffffff",
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
    addTrackButton:{
        paddingTop:20,
        alignSelf:'center'
    },
    headerText:{
        height:50,
        width:'100%',
        color:"#FFFFFF"
    },
    buttonViewStyle:{
        width:'100%',
        padding: 2
    },
    nativeFeedbackStyle: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor : "#c6c6c6",
    },
    textStyleBeacon:{
        color:"#ffffff",
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
    iconStyle:{
        backgroundColor:'transparent',
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
});

export default class Menu extends React.Component{

    constructor(props){
        super(props);

        this._renderContent = this._renderContent.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderModal = this._renderModal.bind(this);
    }

    render(){

        const buttonFinish = this.props.userCanFinish ?
            (<IconFoundation.Button
                name="check"
                color={COLORS.Secondary}
                style={styles.addTrackButton}
                underlayColor='#f0f0f0'
                onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate('CreateGameAssignTeams');
                }}
                backgroundColor='transparent'
                background={TouchableNativeFeedback.Ripple('blue')}
                delayPressIn={0}>Finish</IconFoundation.Button>)
            :
            (<View/>);

        return (
            <ScrollView style={styles.container}>
                <Text
                    style={styles.title}>
                    All tracks
                </Text>
                <Accordion
                    sections={this.props.userTracks}
                    style={styles.flatList}
                    underlayColor="#f0f0f0"
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                />
                <IconFoundation.Button
                    name="plus"
                    color={COLORS.Secondary}
                    style={styles.addTrackButton}
                    underlayColor='#f0f0f0'
                    onPress={this.props.onAddNewTrack}
                    backgroundColor='transparent'
                    background={TouchableNativeFeedback.Ripple('blue')}
                    delayPressIn={0}/>

                {buttonFinish}

            </ScrollView>
        );
    }

    _renderHeader(section) {
        if(section.id === this.props.currentTrackID){
            return (
                <View style={styles.headerCurrentTrack}>
                    <TextInput
                        style={styles.headerText}
                        onChangeText={(text) => this.props.onTrackNameChanged(section,text)}
                        editable={section.isNameEditable === true}
                        onSubmitEditing={() => {this.props.onSubmitTrackName(section)}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor="#FFFFFF"
                        placeholder={section.isNameEditable === true ? "" : section.trackName}/>


                        <IconAwesome
                            name="arrows-h"
                            color="#ffffff"
                            size={17}
                            backgroundColor='transparent'/>


                    <View style={{width:'35%',paddingRight:8, paddingLeft:5}}>
                        <Text style={{ color:'#ffffff'}}>
                            {
                                section.totalDistance !== undefined ?
                                    (section.totalDistance > 1000 ?
                                        (section.totalDistance/1000).toFixed(3) + "km" :
                                            section.totalDistance.toFixed(3) + "m")

                                    :
                                0
                            }
                        </Text>
                    </View>


                        <IconAwesome
                            name="arrows-v"
                            color="#ffffff"
                            size={17}
                            backgroundColor='transparent'/>


                    <View style={{width:'31%',paddingLeft:5}}>
                        <Text style={{ color:'#ffffff'}}>
                        {
                            section.altitudeDelta !== undefined ?
                            section.altitudeDelta.toFixed(3) :
                            0
                        } m
                        </Text>
                    </View>

                </View>
            );
        }
        else
        {
            return (
                <View style={styles.header}>
                    <TextInput
                        style={styles.headerText}
                        onChangeText={(text) => this.props.onTrackNameChanged(section,text)}
                        editable={section.isNameEditable === true}
                        onSubmitEditing={() => {this.props.onSubmitTrackName(section)}}
                        underlineColorAndroid='transparent'
                        placeholder={section.isNameEditable === true ? "" : section.trackName}
                        placeholderTextColor="#FFFFFF"/>


                        <IconAwesome
                            name="arrows-h"
                            color="#ffffff"
                            size={17}
                            backgroundColor='transparent'/>


                    <View style={{width:'35%',paddingRight:5, paddingLeft:5}}>
                        <Text style={{ color:'#ffffff'}}>
                            {
                                section.totalDistance !== undefined ?
                                    (section.totalDistance > 1000 ?
                                        (section.totalDistance/1000).toFixed(3) + "km" :
                                        section.totalDistance.toFixed(3) + "m")

                                    :
                                    0
                            }
                        </Text>
                    </View>


                    <IconAwesome
                        name="arrows-v"
                        color="#ffffff"
                        size={17}
                        backgroundColor='transparent'/>


                    <View style={{width:'31%',paddingLeft:5}}>
                        <Text style={{ color:'#ffffff'}}>
                            {
                                section.altitudeDelta !== undefined ?
                                section.altitudeDelta.toFixed(3) :
                                0
                            } m
                        </Text>
                    </View>
                </View>
            );
        }
    }

    _renderContent(section) {
        return (
            <View style={{flex:1, flexDirection: 'column',justifyContent:'center',backgroundColor:"#f3f3f3"}}>
                <Text>Number of beacons : {section.beacons.length}</Text>
                <View style={{flexDirection: 'row',justifyContent:'center'}}>
                    <IconFoundation.Button
                        name="pencil"
                        color={COLORS.Secondary}
                        backgroundColor='transparent'
                        onPress={() => {this.props.onEditTrack(section)}}
                        background={TouchableNativeFeedback.Ripple('blue')}
                        delayPressIn={0}/>
                    <IconCustom.Button
                        name="remove_all_drop"
                        color={COLORS.Secondary}
                        backgroundColor='transparent'
                        onPress={() => {this.props.onClearBeacons(section)}}
                        background={TouchableNativeFeedback.Ripple('blue')}
                        delayPressIn={0}/>
                    <IconMaterial.Button
                        name="cursor-text"
                        color={COLORS.Secondary}
                        backgroundColor='transparent'
                        onPress={() => {this.props.onEditTrackName(section)}}
                        background={TouchableNativeFeedback.Ripple('blue')}
                        delayPressIn={0}/>
                    <IconFoundation.Button
                        name="trash"
                        color='#FF0017'
                        backgroundColor='transparent'
                        onPress={() => {this.props.onDeleteTrack(section)}}
                        background={TouchableNativeFeedback.Ripple('blue')}
                        delayPressIn={0}/>
                </View>
                <FlatList
                    data={section.beacons.filter((item) => item.id !== this.props.beaconFinishLine.id)}
                    style={styles.flatList}
                    keyExtractor={item => JSON.stringify(item.id)}
                    renderItem={({ item,index }) => (
                        <View
                            style={styles.buttonViewStyle}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('white')}
                                onPress={() => {this.props.onRequestModal(item)}}
                                delayPressIn={0}>
                                <View style={styles.nativeFeedbackStyle}>
                                    {
                                        item.name === undefined ?
                                            <Text style={styles.textStyleBeacon}>
                                                Beacon {index + 1}
                                            </Text>
                                            :
                                            <Text style={styles.textStyleBeacon}>
                                                {item.name}
                                            </Text>
                                    }
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    )}/>
                {
                    this._renderModal()
                }
            </View>
        );
    }

    _renderModal(section){
        if(this.props.currentCustomizingBeacon === undefined) return (<View/>);
        switch(this.props.chosenMode.mode){
            case GAME_MODES.NORMAL:
               return(
                   <SimpleModal
                       setImagePath={this.props.setImagePath}
                       modalVisible={this.props.modalVisible}
                       onCancelCustomizeBeacon={this.props.onCancelCustomizeBeacon}
                       currentCustomizingBeacon = {this.props.currentCustomizingBeacon}
                       setCurrentBeaconName={this.props.setCurrentBeaconName}
                       onConfirmCustomizeBeacon={this.props.onConfirmCustomizeBeacon}
                       section={section}
                       sendImageToServer={this.props.sendImageToServer}
                       onCloseModal={this.props.onCloseModal}/>);

            case GAME_MODES.RIDDLES:
                return(
                    <RiddleModal
                        setImagePath={this.props.setImagePath}
                        requestNewRandomRiddle={this.props.requestNewRandomRiddle}
                        modalVisible={this.props.modalVisible}
                        showModalRandomRiddle={this.props.showModalRandomRiddle}
                        showModalCustomRiddle={this.props.showModalCustomRiddle}
                        addRandomRiddle={this.props.addRandomRiddle}
                        sendImageToServer={this.props.sendImageToServer}
                        addCustomRiddle={this.props.addCustomRiddle}
                        submitRandomRiddle={this.props.submitRandomRiddle}
                        submitCustomRiddle={this.props.submitCustomRiddle}
                        onCancelCustomizeBeacon={this.props.onCancelCustomizeBeacon}
                        currentCustomizingBeacon = {this.props.currentCustomizingBeacon}
                        setCurrentBeaconName={this.props.setCurrentBeaconName}
                        setCurrentBeaconRiddleStatement={this.props.setCurrentBeaconRiddleStatement}
                        setCurrentBeaconRiddleAnswer={this.props.setCurrentBeaconRiddleAnswer}
                        onConfirmCustomizeBeacon={this.props.onConfirmCustomizeBeacon}
                        section={section}
                        onCloseModal={this.props.onCloseModal}/>);

            case GAME_MODES.RIDDLES_AND_QR_CODE:
                return(
                    <RiddleAndCodeModal
                        showModalBeaconID={this.props.showModalBeaconID}
                        closeModalBeaconID={this.props.closeModalBeaconID}
                        modalBeaconIDVisible={this.props.modalBeaconIDVisible}
                        sendImageToServer={this.props.sendImageToServer}
                        setCurrentBeaconQRCode={this.props.setCurrentBeaconQRCode}
                        submitCustomRiddle={this.props.submitCustomRiddle}
                        showModalCustomRiddle={this.props.showModalCustomRiddle}
                        setImagePath={this.props.setImagePath}
                        addCustomRiddle={this.props.addCustomRiddle}
                        QRCodePickerVisible={this.props.QRCodePickerVisible}
                        showQRCodePicker={this.props.showQRCodePicker}
                        closeQRCodePicker={this.props.closeQRCodePicker}
                        requestNewRandomRiddle={this.props.requestNewRandomRiddle}
                        modalVisible={this.props.modalVisible}
                        onCancelCustomizeBeacon={this.props.onCancelCustomizeBeacon}
                        currentCustomizingBeacon = {this.props.currentCustomizingBeacon}
                        setCurrentBeaconName={this.props.setCurrentBeaconName}
                        onConfirmCustomizeBeacon={this.props.onConfirmCustomizeBeacon}
                        section={section}
                        onCloseModal={this.props.onCloseModal}/>);

        }

    }
}