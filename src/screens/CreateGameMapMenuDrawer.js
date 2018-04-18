import React from 'react';
import PropTypes from 'prop-types';
import {COLORS} from '../utils/constants'
import Accordion from 'react-native-collapsible/Accordion';
import IconFoundation from 'react-native-vector-icons/Foundation';
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
        backgroundColor:COLORS.Secondary,
        marginBottom:1,
        width:'auto',
        padding:10,
    },
    headerCurrentTrack:{
        backgroundColor:COLORS.Primary_accent,
        marginBottom:1,
        width:'auto',
        padding:10,
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
                </View>
            );
        }
    }

    _renderContent(section) {
        return (
            <View style={{flex:1, flexDirection: 'column',justifyContent:'center',backgroundColor:"#f3f3f3"}}>
                <Text>Number of beacons : {section.beacons.length}</Text>
                {this._renderTrackLength(section.totalDistance)}
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
                                onPress={() => {this.props.onRequestModal()}}
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
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}
                    isVisible={this.props.modalVisible}>

                    <View style={{ flex: 0,
                        backgroundColor:'#ffffff',
                        justifyContent: 'center',
                        alignItems:'center',
                        width:'100%',
                        height:400 }}>
                        <View>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('grey')}
                                onPress={() => {console.log("aaaaaaaaa")}}
                                delayPressIn={0}>
                                <Image
                                    style={{width:80,height:80}}
                                    source={require('../images/logo_512.png')}
                                />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    _renderTrackLength(length){
        if(length !== undefined){
            return(
                <Text>Distance : {(length/1000).toFixed(3)} km</Text>
            )
        }
        else
        {
            return(
                <Text>Not yet traced</Text>
            )
        }
    }

}