import React from 'react';
import PropTypes from 'prop-types';
import {COLORS} from '../utils/constants'
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
        height:100,
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
        flexDirection:'row',
        backgroundColor:COLORS.Secondary,
    },
    headerCurrentTrack:{
        height:100,
        justifyContent:'space-between',
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
    }

    render(){
        return (
            <View style={styles.container}>
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

            </View>
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
                        value="Track"/>

                    <View style={{width:'15%'}}>
                        <IconAwesome.Button
                            name="arrows-h"
                            color="#ffffff"
                            backgroundColor='transparent'
                            delayPressIn={0}/>
                    </View>

                    <View style={{width:'35%',paddingRight:5}}>
                        <Text style={{ color:'#ffffff'}}>
                            {
                                section.totalDistance !== undefined ?
                                section.totalDistance.toFixed(3) :
                                0
                            } m
                        </Text>
                    </View>

                    <View style={{width:'15%'}}>
                        <IconAwesome.Button
                            name="arrows-v"
                            color="#ffffff"
                            backgroundColor='transparent'
                            delayPressIn={0}/>
                    </View>

                    <View style={{width:'35%',paddingRight:5}}>
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
                        placeholder="Track"
                        placeholderTextColor="#FFFFFF"/>

                    <View style={{width:'15%'}}>
                        <IconAwesome.Button
                            name="arrows-h"
                            color="#ffffff"
                            backgroundColor='transparent'
                            delayPressIn={0}/>
                    </View>

                    <View style={{width:'35%',paddingRight:5}}>
                        <Text style={{ color:'#ffffff'}}>
                            {
                                section.totalDistance !== undefined ?
                                section.totalDistance.toFixed(3) :
                                0
                            } m
                        </Text>
                    </View>

                    <View style={{width:'15%'}}>
                        <IconAwesome.Button
                            name="arrows-v"
                            color="#ffffff"
                            backgroundColor='transparent'
                            delayPressIn={0}/>
                    </View>

                    <View style={{width:'35%',paddingRight:5}}>
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
                    data={section.beacons}
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
                                    <Text style={styles.textStyleBeacon}>
                                        Beacon {index + 1}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    )}/>

                <Modal
                    onBackdropPress={() => {this.props.onCloseModal()}}
                    isVisible={this.props.modalVisible}>

                    <View style={{ width:'100%',
                        height:'50%',
                        backgroundColor:'#ffffff',
                        justifyContent: 'center',
                        alignItems:'center',
                        flexDirection:'column'}}>
                        <View style={{width:'50%',height:'50%',justifyContent:'space-between'}}>

                            <View
                            style={{flex:1, justifyContent:'center',alignSelf:'center',width:70,height:70}}>
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('grey')}
                                    onPress={() => {this._showPicker()}}
                                    style={{backgroundColor:'red',alignSelf:'center',width:50,height:50}}
                                    delayPressIn={0}>
                                    {
                                        this.props.currentCustomizingBeacon === undefined || this.props.currentCustomizingBeacon.imagePath === undefined ?
                                            <Image
                                                style={{width:'100%',height:'100%',alignSelf:'center'}}
                                                source={require('../images/logo_254.png')}
                                            />
                                            :
                                            <Image
                                                style={{width:'100%',height:'100%',alignSelf:'center'}}
                                                source={{uri:"file://" + this.props.currentCustomizingBeacon.imagePath}}
                                            />
                                    }
                                </TouchableNativeFeedback>
                                <View style={{flex:2}}></View>
                            </View>

                            <View
                                style={{flex:1,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>

                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('grey')}
                                    style={{flex:2}}
                                    onPress={() => {this.props.onCancelCustomizeBeacon(section)}}
                                    delayPressIn={0}>
                                        <Text style={{
                                            fontSize:19
                                        }}>
                                            Cancel
                                        </Text>
                                </TouchableNativeFeedback>

                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('grey')}
                                    style={{flex:2}}
                                    onPress={() => {this.props.onCloseModal()}}
                                    delayPressIn={0}>
                                        <Text style={{
                                            fontSize:19
                                        }}>
                                            Confirm
                                        </Text>
                                </TouchableNativeFeedback>
                            </View>
                        </View>

                    </View>
                </Modal>
            </View>
        );
    }

    _showPicker(){
        var options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                console.log(response.path);
                this.props.setImagePath(response.path);
            }
        });
    }


}