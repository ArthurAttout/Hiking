import React from 'react';
import {COLORS} from '../../utils/constants'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../config/selection.json';
const IconCustom = createIconSetFromIcoMoon(icomoonConfig);
import {StyleSheet, ScrollView, TextInput,
    View, Image, Text,FlatList, TouchableNativeFeedback} from 'react-native';
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";

export default class SimpleModal extends React.Component{

    constructor(props){
        super(props);

        this._showPicker = this._showPicker.bind(this);
    }

    render(){
        return(
            <Modal
                onBackdropPress={() => {this.props.onCloseModal()}}
                isVisible={this.props.modalVisible}>

                <View style={{ width:'100%',
                    height:'50%',
                    backgroundColor:'#ffffff',
                    justifyContent: 'center',
                    alignItems:'center',
                    flexDirection:'column'}}>
                    <View style={{width:'100%',height:'100%',justifyContent:'space-between', padding:35}}>

                        <View
                            style={{flex:1, justifyContent:'space-between',alignContent:'center',alignSelf:'center',flexDirection:"row",width:'100%',height:'100%'}}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('grey')}
                                //onPress={this._showPicker}
                                onPress={()=>{console.log(this.props.currentCustomizingBeacon);this._showPicker()}}
                                delayPressIn={0}>
                                {

                                    this.props.currentCustomizingBeacon === undefined || this.props.currentCustomizingBeacon.imagePath === undefined ?
                                        <Image
                                            style={{width:80,height:80,alignSelf:'center'}}
                                            source={require('../../images/logo_254.png')}
                                        />
                                        :
                                        <Image
                                            style={{width:'50%',height:'50%',alignSelf:'center'}}
                                            source={{uri:"file://" + this.props.currentCustomizingBeacon.imagePath}}
                                        />
                                }
                            </TouchableNativeFeedback>
                            <TextInput
                                style={{width:200,height:60, alignSelf:'center'}}
                                placeholder={'Beacon name'}
                                value={this.props.currentCustomizingBeacon.name}
                                onChangeText={(name) => this.props.setCurrentBeaconName(name)}
                            />
                        </View>

                        <View
                            style={{flex:1,flexDirection:'row', justifyContent:'flex-end',alignItems:'flex-end'}}>

                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('grey')}
                                style={{flex:2}}
                                onPress={() => {this.props.onCancelCustomizeBeacon(this.props.section)}}
                                delayPressIn={0}>
                                <Text style={{
                                    fontSize:19,
                                    padding:15
                                }}>
                                    Cancel
                                </Text>
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('grey')}
                                style={{flex:2}}
                                onPress={() => {this.props.onConfirmCustomizeBeacon()}}
                                delayPressIn={0}>
                                <Text style={{
                                    fontSize:19,
                                    padding:15
                                }}>
                                    Confirm
                                </Text>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    _showPicker(){
        let options = {
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