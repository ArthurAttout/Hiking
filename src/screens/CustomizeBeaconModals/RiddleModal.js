import React from 'react';
import {COLORS} from '../../utils/constants'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../config/selection.json';
const IconCustom = createIconSetFromIcoMoon(icomoonConfig);
import {StyleSheet, ScrollView, TextInput,
    View, Image, Text,FlatList, TouchableNativeFeedback} from 'react-native';
import Modal from "react-native-modal";


const styles = StyleSheet.create({
    nativeFeedbackStyle: {
        margin:5,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        width:'100%',
        backgroundColor : "#f0f0f0",
        borderRadius:4
    },
    textStyle:{
        color:"#000000",
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:12,
        borderRadius:10
    },
});

export default class RiddleModal extends React.Component{
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
                                onPress={() => {this._showPicker()}}
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
                            style={{flex:1,flexDirection:'column', justifyContent:'center',alignItems:'center', marginTop:20}}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('white')}
                                style={{margin:15}}
                                delayPressIn={0}>
                                <View style={styles.nativeFeedbackStyle}>
                                    <Text style={styles.textStyle}>
                                        Add a custom riddle
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                style={{margin:15}}
                                background={TouchableNativeFeedback.Ripple('white')}
                                delayPressIn={0}>
                                <View style={styles.nativeFeedbackStyle}>
                                    <Text style={styles.textStyle}>
                                        Add a random riddle
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
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
}